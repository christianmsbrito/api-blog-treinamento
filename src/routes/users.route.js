const controller = require('../controllers/users.controller');

module.exports = (router) => {
    router.post('/users/signup', controller.create);
    router.post('/users/login', controller.login);
    router.get('/users/:id/posts', controller.listPosts);
    router.get('/users/:id/comments', controller.listComments);
}