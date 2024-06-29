const formatDataExpenseAndIncome = require("../utils/formatDataExpenseAndIncome");
const expenseAndIncomeMessagesLogs = require("./expenseAndIncomeMessagesLogs");
const config = require("../config/process.env");
const formSendUser = require("../utils/formSendUser");
const getTimeUntilEndOfDay = require("../utils/getTimeUntilEndOfDay");

module.exports = async (ctx, message) => {
    if (message.startsWith("t ")) {
        const messageFormat = message.slice(2).match(/^(.+?)\s(\d+)\s*(.+)?$/);
        if (formatDataExpenseAndIncome(messageFormat, "Income")) {
            const sentMessage = await expenseAndIncomeMessagesLogs(
                message,
                config.userId,
            );
            ctx.reply(formSendUser.recordedSuccessfully(message), {
                parse_mode: "HTML",
            });

            // Xóa tin nhắn của người dùng
            await ctx.deleteMessage(ctx.message.message_id);

            // Xóa tin nhắn của bot vào cuối ngày
            setTimeout(async () => {
                try {
                    await ctx.deleteMessage(sentMessage.message_id);
                } catch (error) {}
            }, getTimeUntilEndOfDay());
        } else {
            ctx.reply("Error");
        }
    } else {
        const messageFormat = message.match(/^(.+?)\s(\d+)\s*(.+)?$/);
        if (formatDataExpenseAndIncome(messageFormat, "Expense")) {
            await expenseAndIncomeMessagesLogs(message, config.userId);
            const sentMessage = await ctx.reply(
                formSendUser.recordedSuccessfully(message),
                {
                    parse_mode: "HTML",
                },
            );

            // Xóa tin nhắn của người dùng
            await ctx.deleteMessage(ctx.message.message_id);

            // Xóa tin nhắn của bot vào cuối ngày
            setTimeout(async () => {
                try {
                    await ctx.deleteMessage(sentMessage.message_id);
                } catch (error) {}
            }, getTimeUntilEndOfDay());
        } else {
            ctx.reply("Error");
        }
    }
    // Expense and Incomem END
};
