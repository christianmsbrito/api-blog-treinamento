module.exports = (ctx, message) => {
    ctx.body = message;
    ctx.status = 404;
}