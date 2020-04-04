const queryBuilderDate = require('../_shared/query/query-date.helper');
const paginationBuilder = require('../_shared/query/query-pagination.helper');

const { Post } = require('../models/post.model');

class Service {
    async create(payload) {
        return Post.create(payload);
    }

    async list(query) {
        const filters = { ...queryBuilderDate(query) }

        if (query.title, query.title.length > 5) {
            filters.name = {
                $regex: new RegExp(`.*${query.name}.*`)
            }
        }

        const { skip, limit } = paginationBuilder(query);

        return User.find(filters)
            .skip(skip)
            .limit(limit);
    }

    async listByAuthor(author, query) {
        if (query.title && query.title.length > 5) {
            filters.title = {
                $regex: new RegExp(`.*${query.name}.*`)
            }
        }

        const { skip, limit } = paginationBuilder(query);

        return Post.find({ author })
            .skip(skip)
            .limit(limit);
    }

    async remove(id) {
        return Post.deleteOne({ _id: id });
    }

    async getById(id) {
        return Post.findOne({ _id: id });
    }

    async update(id, payload) {
        return Post.updateOne({ _id: id }, payload);
    }
}

module.exports = new Service();