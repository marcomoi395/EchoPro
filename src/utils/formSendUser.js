const expenseNoteReminderAfternoon =
    "<b>Chào buổi trưa!</b> 🌞\n" +
    "\n" +
    "Đã đến giữa ngày rồi đấy! Hãy dành một chút thời gian để ghi chú lại các khoản chi tiêu của bạn nhé. Điều này sẽ giúp bạn kiểm soát tài chính hiệu quả hơn.\n" +
    "\n" +
    "Hãy gõ <b>/recommend</b> 📝 để xem các ghi chú gần đây.\n" +
    "\n" +
    "Nếu cần hỗ trợ thêm, đừng ngần ngại liên hệ cho chúng tôi! <b>/help</b>";

const expenseNoteReminderEvening =
    "🌙 <b> Chào buổi tối!</b> 🌠\n" +
    "\n" +
    "Đã đến lúc cuối ngày rồi! Hãy ghi chú lại các khoản chi tiêu của bạn ngay bây giờ.\n" +
    "\n" +
    "Hãy gõ <b>/recommend</b> 📝 để xem các ghi chú gần đây.\n" +
    "\n" +
    "Nếu cần hỗ trợ thêm, đừng ngần ngại liên hệ cho chúng tôi! <b>/help</b>";

const confessionReminder =
    "🌙 <b> Hey!</b>  🌠\n" +
    "\n" +
    "Đã đến lúc cuối ngày rồi! Hãy viết lời thú tội của ngày hôm nay ngay bây giờ.\n" +
    "\n" +
    "Hãy gõ <b>/confession</b> để bắt đầu.\n";

function recordedSuccessfully(text) {
    return (recordedSuccessfully =
        "✨ Ghi chú đã được ghi lại thành công!\n" +
        "\n" +
        `Nội dung ghi chú là: <b> ${text} </b>`);
}

module.exports = {
    expenseNoteReminderAfternoon,
    expenseNoteReminderEvening,
    recordedSuccessfully,
    confessionReminder,
};
