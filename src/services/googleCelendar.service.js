const { google } = require("googleapis");
const moment = require("moment-timezone");
const config = require("../config/process.env");
const credentials = JSON.parse(config.credentials);

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

const calendar = google.calendar({
    version: "v3",
    auth: new google.auth.JWT(
        credentials.client_email,
        null,
        credentials.private_key,
        SCOPES,
    ),
});

// Hàm để lấy danh sách các sự kiện từ Google Calendar
module.exports.getEvents = async (time) => {
    try {
        const response = await calendar.events.list({
            calendarId: "marcomoi395@gmail.com",
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: "startTime",
        });
        return response.data.items;
    } catch (err) {
        console.error("Lỗi khi lấy sự kiện:", err);
    }
};

// Hàm để thêm một sự kiện vào Google Calendar
module.exports.addEvents = async (events) => {
    try {
        const insertPromises = events.map((event) =>
            calendar.events.insert({
                calendarId: "marcomoi395@gmail.com", // ID của lịch trình (của bạn)
                resource: {
                    summary: event[0],
                    // location: 'Phòng họp 3, Tòa nhà chính',
                    description: event[2],
                    // start: {
                    //     dateTime: moment
                    //         .tz("2024-07-13", "Asia/Ho_Chi_Minh")
                    //         .format(),
                    //     timeZone: "Asia/Ho_Chi_Minh",
                    // },
                    // end: {
                    //     dateTime: moment
                    //         .tz("2024-07-13", "Asia/Ho_Chi_Minh")
                    //         .format(),
                    //     timeZone: "Asia/Ho_Chi_Minh",
                    // },
                    start: {
                        date: event[1],
                    },
                    end: {
                        date: event[1],
                    },
                },
            }),
        );

        const responses = await Promise.all(insertPromises);
        responses.forEach((response) => {
            console.log("Sự kiện đã được thêm thành công:", response.data);
        });
    } catch (err) {
        console.error("Lỗi khi thêm sự kiện:", err);
    }
};

// Ví dụ sử dụng hàm addEvent để thêm một sự kiện mới
// const newEvent = {
//     summary: "Lam Nhac",
//     // location: 'Phòng họp 3, Tòa nhà chính',
//     description: "Buổi họp để thảo luận về tiến độ dự án.",
//     start: {
//         dateTime: moment.tz("2024-07-10 13:00", "Asia/Ho_Chi_Minh").format(),
//         timeZone: "Asia/Ho_Chi_Minh",
//     },
//     end: {
//         dateTime: moment.tz("2024-07-10 23:00", "Asia/Ho_Chi_Minh").format(),
//         timeZone: "Asia/Ho_Chi_Minh",
//     },
// };
