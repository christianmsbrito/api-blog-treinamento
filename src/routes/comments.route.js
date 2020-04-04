const controller = require('../controllers/comments.controller');

module.exports = (router) => {
    router.post('/comments', controller.create);
}