const db = require('../_shared/databasa/mongo.connector');

const { Schema } = require('mongoose');

const mongooseDelete = require('mongoose-delete');

const schema = Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { versionKey: false, timestamps: true });

schema.plugin(mongooseDelete, { overrideMethods: true });

module.exports.User = db.connection.model('User', schema);