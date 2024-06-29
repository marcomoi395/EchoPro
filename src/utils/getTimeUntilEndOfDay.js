function getTimeUntilEndOfDay() {
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1); // Lúc 0:00 của ngày hôm sau
    return endOfDay - now;
}

module.exports = getTimeUntilEndOfDay;