const Router = require('koa-router');

const usersRoute = require('./users.route');
const postsRoute = require('./posts.route');
const commentsRoute = require('./comments.route');
const authMiddleware = require('../_shared/middlewares/auth.middleware');

class RoutesLoader {
    constructor() {
        this.router = new Router();
    }
    
    load(app) {
        this.router.prefix(`/api/${process.env.BASE_API}`);

        this.router.use(authMiddleware);

        usersRoute(this.router);
        postsRoute(this.router);
        commentsRoute(this.router);

        app.use(this.router.routes());
    }
}

module.exports = new RoutesLoader();

