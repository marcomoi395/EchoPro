const ExpenseAndIncome = require('../models/expenseAndIncome.model');
const config = require('../config/process.env');

module.exports = async () => {
    const record = await ExpenseAndIncome.findOne({}).limit(3);
    if (record?.chat.length > 0)
        return record.chat;
    else return "";
};