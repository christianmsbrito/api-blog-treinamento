const userService = require('../services/user.service');
const postsService = require('../services/post.service');
const commentsService = require('../services/comment.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { onBadRequest, onCreated, onNotFound, onSuccess, onUnauthorized } = require('../_shared/response-helper/index');

class Controller {
    async create(ctx) {
        try {
            const { body } = ctx.request;

            const missingFields = ['name', 'email', 'password'].filter(prop => !body[prop]);

            if (missingFields.length > 0) {
                return onBadRequest(ctx, `Can't create user! missing required fields ${missingFields.join(', ')}`);
            }

            const createdUser = await userService.create(body);

            return onCreated(ctx, createdUser);
        } catch (err) {
            return onBadRequest(ctx, err);
        }
    }

    async login(ctx) {
        console.log(ctx.request.headers);
        const { authorization } = ctx.request.headers;

        if (!authorization) {
            return onUnauthorized(ctx, 'Authorization token was not sent!');
        }

        if (authorization && !authorization.includes('Basic ')) {
            return onUnauthorized(ctx, 'Invalid Authorization format!');
        }

        const text = Buffer.from(authorization.replace('Basic ', ''), 'base64').toString('utf-8');

        const [email, password] = text.split(':');

        const user = await userService.findByEmail(email);

        if (!user) {
            return onBadRequest(ctx, 'Email not found!');
        }

        const isValidPassword = bcrypt.compareSync(password, user.password);

        if (!isValidPassword) {
            return onUnauthorized(ctx, 'Passoword does not match!');
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email,
        }, process.env.JWT_SECRET, { expiresIn: 86400 });

        return onSuccess(ctx, {
            type: 'Bearer',
            token,
            expiresIn: 86400
        });
    }

    async listPosts(ctx) {
        try {
            const { query } = ctx.request;
            const { id } = ctx.params;

            const posts = await postsService.listByAuthor(id, query);

            if (!posts || posts.length === 0) {
                return onNotFound(ctx, 'No posts found  for this atuhor!');
            }

            return onSuccess(ctx, posts);
        } catch (err) {
            return onBadRequest(ctx, err.message);
        }
    }

    async listComments(ctx) {
        try {
            const { query } = ctx.request;
            const { id } = ctx.params;

            const comments = await commentsService.listByAuthor(id, query);

            if (comments && comments.length === 0) {
                return onNotFound(ctx, 'No posts found  for this atuhor!');
            }

            return onSuccess(ctx, comments);
        } catch (err) {
            console.log(err);
            return onBadRequest(ctx, err.message);
        }
    }
}

module.exports = new Controller();