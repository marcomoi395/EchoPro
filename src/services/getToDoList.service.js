// const config = require("../config/process.env");
// const keyboard = require("../utils/keyboards");
// const callbackHandlers = require("../handlers/callbackHandlers");
// const notion = require("../services/notionService");
// const moment = require("moment");
//
// module.exports = async () => {
//     try {
//         const today = moment().format("DD/MM/YYYY");
//         const textToDoList = await notion.getTodoList();
//         return (
//             `📅 Danh sách công việc hôm nay (${today}): \n\n` +
//             textToDoList +
//             "\nChúc bạn có một ngày làm việc hiệu quả! 🌟\n" +
//             "\n"
//         );
//     } catch (e) {}
// };
