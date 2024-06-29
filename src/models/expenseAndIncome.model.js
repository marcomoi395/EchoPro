const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
    {
        userId: String,
        chat: [
            {
                type: String
            }
        ]
    },
    {
        timestamps: true,
    },
);

const ExpenseAndIncome = mongoose.model("ExpenseAndIncome", expenseSchema, "chat_expense_and_income");

module.exports = ExpenseAndIncome;
