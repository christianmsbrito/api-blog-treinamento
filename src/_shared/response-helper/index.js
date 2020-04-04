const onCreated = require('./onCreated');
const onSuccess = require('./onSuccess');
const onBadRequest = require('./onBadRequest');
const onNotFound = require('./onNotFound');
const onUnauthorized = require('./onUnauthorized');
const onNoContent = require('./onNoContent');

module.exports = {
    onBadRequest,
    onCreated,
    onSuccess,
    onNotFound,
    onUnauthorized,
    onNoContent
}