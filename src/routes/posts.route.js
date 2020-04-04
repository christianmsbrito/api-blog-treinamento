const controller = require('../controllers/posts.controller');

module.exports = (router) => {
    router.post('/posts', controller.create);
    router.patch('/posts/:id', controller.update);
    router.delete('/posts/:id', controller.remove);
    router.get('/posts/:id/comments', controller.listComments);
}