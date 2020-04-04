const db = require('../_shared/databasa/mongo.connector');

const { Schema } = require('mongoose');

const mongooseDelete = require('mongoose-delete');

const schema = Schema({
    post: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true }
}, { versionKey: false, timestamps: true });

schema.plugin(mongooseDelete, { overrideMethods: true });

module.exports.Comment = db.connection.model('Comment', schema);