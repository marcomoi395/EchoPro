const config = require("../config/process.env");
const responseConfessionMessage = require("../utils/responseConfessionMessage");
const notionService = require("../services/notionService");
const extractPartForAdditionalToDoLists = require("../utils/extractPartForAdditionalToDoLists");
const googleCelendar = require("../services/googleCelendar.service");

module.exports = async (ctx, message) => {
    const dataArray = extractPartForAdditionalToDoLists(message);
    console.log(dataArray);
    let sentMessage;
    try {
        await notionService.addToDoList(dataArray);
        await googleCelendar.addEvents(dataArray);

        sentMessage = await ctx.reply("✨ Tuyệt, tôi đã ghi lại rồi á \n");
    } catch (e) {
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
