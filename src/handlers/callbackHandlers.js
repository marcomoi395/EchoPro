const notion = require('../services/notionService');
const regex = require("../utils/regex");
const formatDataExpenseAndIncome = require("../utils/formatDataExpenseAndIncome");
const expenseAndIncomeMessagesLogs = require("../services/expenseAndIncomeMessagesLogs");
const config = require("../config/process.env");
const formSendUser = require("../utils/formSendUser");
const getTimeUntilEndOfDay = require('../utils/getTimeUntilEndOfDay');


module.exports.getAmount = async (ctx) => {
    bot.action(/amount:(.+)/, async (ctx) => {
        const match = ctx.callbackQuery.data.match(/amount:(.+)/);
        if (match) {
            const message = match[1].split(',');
            const amount = await notion.getBudgetTrackerByTime(message[1], message[0]);
            let sentMessage;
            if (message[0] === 'Expense') {
                if (message[1] === 'today')
                    sentMessage = await ctx.reply(`📊 Tổng chi của hôm nay là: ${amount}.`);
                else if (message[1] === 'week')
                    sentMessage = await ctx.reply(`📊 Tổng chi của tuần này là: ${amount}.`);
                else
                    sentMessage = await ctx.reply(`📊 Tổng chi của tháng này là: ${amount}.`);
            } else {
                if (message[1] === 'today')
                    sentMessage = await ctx.reply(`📊 Tổng thu của hôm nay là: ${amount}.`);
                else if (message[1] === 'week')
                    sentMessage = await ctx.reply(`📊 Tổng thu của tuần này là: ${amount}.`);
                else
                    sentMessage = await ctx.reply(`📊 Tổng thu của tháng này là: ${amount}.`);
            }

            // Xóa tin nhắn thông kê sau 20s
            setTimeout(async () => {
                try {
                    await ctx.deleteMessage(sentMessage.message_id);
                } catch (error) {
                }
            }, 20000);

            await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
        }


    });
};

module.exports.addExpenseAndIncomeLog = async (ctx) => {
    bot.action(/sendMessage:(.+)/, async (ctx) => {
        const match = ctx.callbackQuery.data.match(/sendMessage:(.+)/);
        if (match) {
            const message = match[1];
            try {
                if (regex.checkRegexExpense(message))
                    if (message.startsWith('t')) {
                        const messageFormat = message.slice(2).match(/^(.+?)\s(\d+)\s*(.+)?$/);
                        if (formatDataExpenseAndIncome(messageFormat, 'Income')) {
                            const sentMessage = await expenseAndIncomeMessagesLogs(message, config.userId);
                            ctx.reply(formSendUser.recordedSuccessfully(message), {
                                parse_mode: "HTML"
                            });

                            // Xóa tin nhắn của bot vào cuối ngày
                            setTimeout(async () => {
                                try {
                                    await ctx.deleteMessage(sentMessage.message_id);
                                } catch (error) {
                                }
                            }, getTimeUntilEndOfDay());

                        } else {
                            ctx.reply("Error");
                        }
                    } else {
                        const messageFormat = message.match(/^(.+?)\s(\d+)\s*(.+)?$/);
                        if (formatDataExpenseAndIncome(messageFormat, 'Expense')) {
                            await expenseAndIncomeMessagesLogs(message, config.userId);
                            const sentMessage = await ctx.reply(formSendUser.recordedSuccessfully(message), {
                                parse_mode: "HTML"
                            });

                            // Xóa tin nhắn của bot vào cuối ngày
                            setTimeout(async () => {
                                try {
                                    await ctx.deleteMessage(sentMessage.message_id);
                                } catch (error) {
                                }
                            }, getTimeUntilEndOfDay());

                        } else {
                            ctx.reply("Error");
                        }
                    }
                else {
                    ctx.reply("hahaha");
                }
            } catch (e) {
                ctx.reply('Errorrrrrrr');

            }
        } else {
            ctx.answerCbQuery('Định dạng callback query không hợp lệ  ');
        }

        await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    });

};