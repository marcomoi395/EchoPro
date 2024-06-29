const ExpenseAndIncome = require('../models/expenseAndIncome.model');

module.exports = async (message, userId) => {
    const record = await ExpenseAndIncome.findOne({
        userId: userId
    });

    if (record) {
        await ExpenseAndIncome.updateOne({
                userId: userId
            },
            {
                $push: {
                    chat: message
                }
            });
    } else {
        const newRecord = new ExpenseAndIncome({
            userId: userId,
            chat: message
        });
        await newRecord.save();
    }

};