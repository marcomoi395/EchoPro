const Confession = require("../models/confession.model");
const config = require("../config/process.env");
const responseConfessionMessage = require("../utils/responseConfessionMessage");
module.exports = async (ctx, message) => {
    const isExist = await Confession.findOne({ userId: config.userId });
    if (!isExist) {
        const newConfession = new Confession({ userId: config.userId });
        await newConfession.save();
    }
    const messageFormat = message.split("\n");

    if (messageFormat.length > 1) {
        const data = {
            title: messageFormat[0],
            content: messageFormat.slice(1).join("\n"),
        };
        await Confession.updateOne(
            { userId: config.userId },
            {
                $push: {
                    data: data,
                },
            },
        );
    } else {
        await Confession.updateOne(
            { userId: config.userId },
            {
                $push: {
                    data: {
                        content: messageFormat[0],
                    },
                },
            },
        );
    }

    ctx.session.logging = false;
    const sentMessage = await ctx.reply(responseConfessionMessage());

    // Xóa tin nhắn sau 30s
    setTimeout(async () => {
        try {
            await ctx.deleteMessage(ctx.message.message_id);
            await ctx.deleteMessage(sentMessage.message_id);
            await ctx.deleteMessage(ctx.session.sentMessageId);
            ctx.session = {};
        } catch (error) {
            ctx.reply("Có lỗi rồi bạn ơi 🥹");
        }
    }, 30000);
};
