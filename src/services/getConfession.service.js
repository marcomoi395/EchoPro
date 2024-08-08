const Confession = require("../models/confession.model");
const config = require("../config/process.env");
const { writeFile } = require("fs");
const moment = require("moment");

module.exports = async () => {
    const currentDate = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);

    const record = await Confession.aggregate([
        { $match: { userId: config.userId } },
        { $unwind: "$data" },
        {
            $match: {
                "data.date": { $gte: oneMonthAgo, $lt: currentDate },
            },
        },
        { $sort: { "data.date": 1 } },
        {
            $group: {
                _id: "$_id",
                userId: { $first: "$userId" },
                data: { $push: "$data" },
            },
        },
    ]);

    // Function to format messages
    function formatMessages(data) {
        const messages = [];

        if(data){
            data.forEach((item) => {
                let date = moment(
                    item.date,
                    "ddd MMM DD YYYY HH:mm:ss [GMT]Z",
                ).format("MMMM DD YYYY");
                let time = moment(
                    item.date,
                    "ddd MMM DD YYYY HH:mm:ss [GMT]Z",
                ).format("HH:mm");
                if (item.title && item.content) {
                    messages.push(
                        `<b>${date}\n\n${time} - ${item.title}</b>\n${item.content}`,
                    );
                } else {
                    messages.push(`<b>${date}\n\n${time}</b>\n${item.content}`);
                }
            });
        }


        return messages;
    }

    // Get formatted messages
    if(record && record.length > 0){
        const formattedMessages = formatMessages(record[0]?.data);
        return formattedMessages.join("\n\n————————————————\n\n");
    }
    else{
        return '🌙 Không có lời thú tội nào vào tháng này!!!'
    }
};

