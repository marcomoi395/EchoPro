const keyboard = require("../utils/keyboards");
const regex = require("../utils/regex");
const config = require("../config/process.env");
const ExpenseAndIncome = require("../models/expenseAndIncome.model");
const Markup = require("telegraf/markup");
const callbackHandlers = require("../handlers/callbackHandlers");
const expenseAndIncomeService = require("../services/expenseAndIncome.service");
const addConfessionService = require("../services/addConfession.service");
const getConfessionService = require("../services/getConfession.service");
// const addToDoListService = require("../services/addToDoList.service");
// const getToDoListService = require("../services/getToDoList.service");
// const notion = require("../services/notionService");
// const googleCelendar = require("../services/googleCelendar.service");

// Send Message
module.exports.message = async (ctx) => {
    const message = ctx.message.text;
    try {
        if (ctx.session.logging) {
            await addConfessionService(ctx, message);
        // } else if (ctx.session.addToDoList) {
        //     await addToDoListService(ctx, message);
        } else if(ctx.session.getConfession) {
            if(message === config.passwordConfession) {
                const text = await getConfessionService();
                const sentMessage = await ctx.reply(text);

                // Xóa tin nhắn của người dùng
                await ctx.deleteMessage(ctx.message.message_id);
                ctx.session.logging = false;

                // Xóa tin nhắn khi không nhập gì trong 5p
                setTimeout(async () => {
                    try {
                        await ctx.deleteMessage(sentMessage.message_id);
                    } catch (error) {}
                }, 300000);
            }
            else{
                const sentMessage = await ctx.reply("Sai mật khẩu rồi!!!");

                // Xóa tin nhắn của người dùng
                await ctx.deleteMessage(ctx.message.message_id);
                ctx.session.logging = false;

                // Xóa tin nhắn khi không nhập gì trong 5p
                setTimeout(async () => {
                    try {
                        await ctx.deleteMessage(sentMessage.message_id);
                    } catch (error) {}
                }, 30000);
            }
        } else if (regex.checkRegexExpense(message)) {
            await expenseAndIncomeService(ctx, message);
        } else {
            // await googleCelendar.addEvents([""]);
            // const res = await googleCelendar.getEvents();
            // console.log(res);
            // await getToDoListService(ctx);
            const sentMessage = await ctx.reply(
                "Đang nói gì vậy mình không hiểu 😅",
            );
            setTimeout(async () => {
                try {
                    await ctx.deleteMessage(ctx.message.message_id);
                    await ctx.deleteMessage(sentMessage.message_id);
                } catch (error) {}
            }, 5000);
        }
    } catch (e) {
        ctx.reply(e);
    }
};

// Command
module.exports.getAmountExpenseByTime = async (ctx) => {
    try {
        const sentMessage = await ctx.reply(
            "💵 Thống kê chi. Hãy chọn một lựa chọn sau đây:",
            keyboard.timeSelectionExpenseKeyboard,
        );

        // Xóa tin nhắn của người dùng
        await ctx.deleteMessage(ctx.message.message_id);

        // Xóa keyboard sau 20s không hoạt động
        setTimeout(async () => {
            try {
                await ctx.deleteMessage(sentMessage.message_id);
            } catch (error) {}
        }, 20000);

        await callbackHandlers.getAmount(ctx);
    } catch (e) {
        ctx.reply("Error");
    }
};

module.exports.getAmountIncomeByTime = async (ctx) => {
    try {
        const sentMessage = await ctx.reply(
            "💵 Thống kê thu. Hãy chọn một lựa chọn sau đây:",
            keyboard.timeSelectionIncomeKeyboard,
        );

        // Xóa tin nhắn của người dùng
        await ctx.deleteMessage(ctx.message.message_id);

        // Xóa keyboard sau 20s không hoạt động
        setTimeout(async () => {
            try {
                await ctx.deleteMessage(sentMessage.message_id);
            } catch (error) {}
        }, 20000);

        await callbackHandlers.getAmount(ctx);
    } catch (e) {
        ctx.reply("Error");
    }
};

module.exports.sendLastestRequest = async (ctx) => {
    try {
        const record = await ExpenseAndIncome.findOne({
            userId: config.userId,
        });

        const uniqueValues = [...new Set(record.chat)].slice(0, 3);

        let buttons = [];
        uniqueValues.forEach((chat) => {
            buttons.push([Markup.button.callback(chat, `sendMessage:${chat}`)]);
        });

        const timeSelectionIncomeKeyboard = Markup.inlineKeyboard(buttons);

        const sentMessage = await ctx.reply(
            "📋 Dưới đây là một vài ghi chú gần nhất:",
            timeSelectionIncomeKeyboard,
        );

        // Xóa keyboard sau 20s không hoạt động
        setTimeout(async () => {
            try {
                await ctx.deleteMessage(sentMessage.message_id);
            } catch (error) {}
        }, 20000);

        // Xóa tin nhắn của người dùng
        await ctx.deleteMessage(ctx.message.message_id);

        await callbackHandlers.addExpenseAndIncomeLog(ctx);
    } catch (e) {
        ctx.reply(
            "⚠️ Xin lỗi, đã xảy ra lỗi khi tải các ghi chú gần nhất. Vui lòng thử lại sau. 🥹",
        );
    }
};

module.exports.addConfession = async (ctx) => {
    const sentMessage = await ctx.reply(
        "Mình luôn sẵn sàng lắng nghe, dù là chuyện vui hay buồn. Mình ở đây nếu bạn cần. Hãy nói điều gì đó nhá 😘",
    );
    ctx.session.logging = true;
    ctx.session.sentMessageId = sentMessage.message_id;

    // Xóa tin nhắn của người dùng
    await ctx.deleteMessage(ctx.message.message_id);

    // Xóa tin nhắn khi không nhập gì trong 5p

    setTimeout(async () => {
        if (ctx.session.logging === true) {
            try {
                ctx.session.logging = false;
                await ctx.deleteMessage(sentMessage.message_id);
            } catch (error) {}
        }
    }, 300000);
};

module.exports.getConfession = async (ctx) => {
    const sentMessage = await ctx.reply(
        "Nhập mật khẩu rồi mới được xem nhá 😘",
    );
    ctx.session.getConfession = true;
    ctx.session.sentMessageId = sentMessage.message_id;

    // Xóa tin nhắn của người dùng
    await ctx.deleteMessage(ctx.message.message_id);

    // Xóa tin nhắn khi không nhập gì trong 5p
    setTimeout(async () => {
        if (ctx.session.logging === true) {
            try {
                ctx.session.logging = false;
                await ctx.deleteMessage(sentMessage.message_id);
            } catch (error) {}
        }
    }, 30000);
};

// module.exports.addToDoList = async (ctx) => {
//     const sentMessage = await ctx.reply(
//         "⚜️ Hey!  📅\n" +
//             "\n" +
//             "Hãy nói cho tôi một lịch trình nào đó đi, tôi sẽ giúp bạn ghi lại. ",
//     );
//
//     ctx.session.addToDoList = true;
//     ctx.session.sentMessageId = sentMessage.message_id;
//
//     // Xóa tin nhắn của người dùng
//     await ctx.deleteMessage(ctx.message.message_id);
//
//     // Xóa tin nhắn khi không nhập gì trong 1p
//     setTimeout(async () => {
//         if (ctx.session.addToDoList === true) {
//             try {
//                 ctx.session.addToDoList = false;
//                 await ctx.deleteMessage(sentMessage.message_id);
//             } catch (error) {}
//         }
//     }, 60000);
// };
