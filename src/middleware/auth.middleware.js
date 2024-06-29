const config = require("../config/process.env");

function auth(ctx, next) {
    const ownerId = config.userId; // Thay thế bằng user ID của bạn
    const userId = ctx.message.from.id;

    if (userId.toString() === ownerId.toString()) {
        if (!ctx.session) ctx.session = {};
        return next();
    } else {
        ctx.reply("Bạn không có quyền sử dụng bot này.");
    }
}

module.exports = { auth };
