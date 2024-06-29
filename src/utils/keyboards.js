const Markup = require("telegraf/markup");

const timeSelectionExpenseKeyboard = Markup.inlineKeyboard([
    Markup.button.callback("Hôm nay", "amount:Expense,today"),
    Markup.button.callback("Tuần này", "amount:Expense,week"),
    Markup.button.callback("Tháng này", "amount:Expense,month")
]);

const timeSelectionIncomeKeyboard = Markup.inlineKeyboard([
    Markup.button.callback("Hôm nay", "amount:Income,today"),
    Markup.button.callback("Tuần này", "amount:Income,week"),
    Markup.button.callback("Tháng này", "amount:Income,month")
]);

module.exports = {timeSelectionExpenseKeyboard, timeSelectionIncomeKeyboard};