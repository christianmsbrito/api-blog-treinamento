const queryBuilderDate = require('../_shared/query/query-date.helper');
const paginationBuilder = require('../_shared/query/query-pagination.helper');

const { Comment } = require('../models/comment.model');

class Service {
    async create(payload) {
        return Comment.create(payload);
    }

    async list(query) {
        const filters = { ...queryBuilderDate(query) }

        if (query.title && query.title.length > 5) {
            filters.title = {
                $regex: new RegExp(`.*${query.name}.*`)
            }
        }

        const { skip, limit } = paginationBuilder(query);

        return User.find(filters)
            .skip(skip)
            .limit(limit);
    }

    async listByAuthor(author, query) {
        const { skip, limit } = paginationBuilder(query);

        return Comment.find({ author })
            .skip(skip)
            .limit(limit);
    }

    async listByPost(post, query) {
        const { skip, limit } = paginationBuilder(query);

        return Comment.find({ post })
            .skip(skip)
            .limit(limit);
    }

    async remove(id) {
        return Comment.deleteOne({ _id: id });
    }

    async getById(id) {
        return Comment.findOne({ _id: id });
    }

    async update(id, payload) {
        return Comment.updateOne({ _id: id }, payload);
    }
}

module.exports = new Service();