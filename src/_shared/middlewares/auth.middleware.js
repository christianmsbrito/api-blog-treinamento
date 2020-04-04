const jwt = require('jsonwebtoken');

const { onUnauthorized } = require('../response-helper/index');

module.exports = async (ctx, next) => {
    try {
        const isPublicRoute = /\/login$|\/signup$/.test(ctx.request.url);

        if (isPublicRoute) {
            return next();
        }

        const { authorization } = ctx.request.header;

        if(!authorization) {
            return onUnauthorized(ctx, 'Authorization token was not sent!')
        }

        const token = authorization.replace('Bearer ', '');

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        ctx.userId = decoded.id;

        return next();
    } catch (err) {
        return onUnauthorized(ctx, err.message);
    }
}