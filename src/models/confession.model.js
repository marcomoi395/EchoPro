const mongoose = require("mongoose");

const confessionSchema = new mongoose.Schema(
    {
        userId: String,
        data: [
            {
                date: {
                    type: Date,
                    default: Date.now()
                },
                title: String,
                content: {
                    type: String,
                    required: true
                },
            }
        ]
    },
    {
        timestamps: true,
    },
);

const ConfessionModel = mongoose.model("Confession", confessionSchema, "confession");

module.exports = ConfessionModel;
