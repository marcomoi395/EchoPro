const config = require("../config/process.env");
const responseConfessionMessage = require("../utils/responseConfessionMessage");
const notionService = require("../services/notionService");
const extractPartForAdditionalToDoLists = require("../utils/extractPartForAdditionalToDoLists");

module.exports = async (ctx, message) => {
    const dataArray = extractPartForAdditionalToDoLists(message);
    const promises = await notionService.addToDoList(dataArray);

    let sentMessage;
    if (promises) {
        sentMessage = await ctx.reply("✨ Tuyệt, tôi đã ghi lại rồi á \n");
    } else {
        sentMessage = await ctx.reply("Có lỗi rồi bạn ơi 🥹");
    }

    ctx.session.addToDoList = false;

    // Xóa tin nhắn sau 1p
    setTimeout(async () => {
        try {
            await ctx.deleteMessage(ctx.message.message_id);
            await ctx.deleteMessage(sentMessage.message_id);
            await ctx.deleteMessage(ctx.session.sentMessageId);
            ctx.session = {};
        } catch (error) {
            ctx.reply("Có lỗi rồi bạn ơi 🥹");
        }
    }, 60000);
};
