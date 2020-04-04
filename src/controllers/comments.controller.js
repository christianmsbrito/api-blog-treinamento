const commentsService = require('../services/comment.service');

const { onSuccess, onBadRequest, onCreated } = require('../_shared/response-helper/index');

class Controller {
    async create(ctx) {
        try {
            const { body } = ctx.request;
    
            const missingFields = ['author', 'content', 'post'].filter(param => !body[param]);
    
            if (missingFields.length > 0) {
                return onBadRequest(ctx, `Can't create comment! Missing required fields ${missingFields.map(field => `"${field}"`).join(', ')}`);
            }
    
            const createdComment = await commentsService.create(body);
    
            return onCreated(ctx, createdComment);
        } catch(err) {
            return onBadRequest(ctx, err.message);
        }
    }
}

module.exports = new Controller();