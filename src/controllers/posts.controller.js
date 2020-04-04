const postService = require('../services/post.service');
const commentService = require('../services/comment.service');

const { onBadRequest, onCreated, onSuccess, onUnauthorized, onNoContent, onNotFound } = require('../_shared/response-helper/index');

class Controller {
    async create(ctx) {
        try {
            const { body } = ctx.request;

            const missingFields = ['title', 'content'].filter(prop => !body[prop]);

            if (body.author) {
                return onBadRequest(ctx, 'You cannot send post author!');
            }

            body.author = ctx.userId;

            if (missingFields.length > 0) {
                return onBadRequest(ctx, `Can't create post! Missing required fields ${missingFields.join(', ')}`);
            }

            const createdPost = await postService.create(body);

            return onCreated(ctx, createdPost);
        } catch (err) {
            return onBadRequest(ctx, err);
        }
    }

    async listComments(ctx) {
        try {
            const { query } = ctx.request;
            const { id } = ctx.params;

            const comments = await commentService.listByPost(id, query);

            if (!comments || comments.length === 0) {
                return onNotFound(ctx, 'No posts found  for this post!');
            }

            return onSuccess(ctx, comments);
        } catch (err) {
            return onBadRequest(ctx, err.message);
        }
    }

    async update(ctx) {
        const { body } = ctx.request;
        const { id } = ctx.params;

        const post = await postService.getById(id);

        if (!post) {
            return onNotFound(ctx, 'This post does not exists');
        }

        if (post.author.toString() !== ctx.userId) {
            return onUnauthorized(ctx, 'You canot edit a post that you doesnt own!');
        }

        const hasInvalidFields = ['title', 'content', 'tags'].every(prop => !body[prop]);

        if (hasInvalidFields) {
            return onBadRequest(ctx, 'Request body contains invalid fields');
        }

        await postService.update(id, body);

        return onSuccess(ctx, body);
    }

    async remove(ctx) {
        try {
            const { id } = ctx.params;

            const post = await postService.getById(id);

            if (!post) {
                return onNotFound(ctx, 'This post does not exists');
            }

            if (post.author.toString() !== ctx.userId) {
                return onUnauthorized(ctx, 'You canot delete a post that you doesnt own!');
            }

            await postService.remove(id);

            return onNoContent(ctx)
        } catch (err) {
            return onBadRequest(ctx, err.message);
        }
    }
}

module.exports = new Controller();