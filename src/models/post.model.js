const db = require('../_shared/databasa/mongo.connector');

const { Schema } = require('mongoose');

const mongooseDelete = require('mongoose-delete');

const schema = Schema({
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true },
    tags: [{ type: String }],
    content: { type: String, required: true }
}, { versionKey: false, timestamps: true });

schema.plugin(mongooseDelete, { overrideMethods: true });

module.exports.Post = db.connection.model('Post', schema);