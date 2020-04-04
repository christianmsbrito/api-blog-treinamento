const queryBuilderDate = require('../_shared/query/query-date.helper');
const paginationBuilder = require('../_shared/query/query-pagination.helper');

const { User } = require('../models/user.model');

const bcrypt = require('bcryptjs');

class Service {
    async list(query) {
        const filters = { ...queryBuilderDate(query) }

        if (query.name) {
            filters.name = {
                $regex: new RegExp(`.*${query.name}.*`)
            }
        }

        if (query.email) {
            filters.email = query.email
        }

        const { skip, limit } = paginationBuilder(query);

        return User.find(filters)
            .skip(skip)
            .limit(limit);
    }

    async create(payload) {
        payload.password = bcrypt.hashSync(payload.password, 10);
        return User.create(payload);
    }

    async findByEmail(email) {
        return User.findOne({ email });
    }

    update() {

    }

    remove() {

    }

    getById() {

    }
}

module.exports = new Service();