function getToday() {
    return new Date().toISOString().split('T')[0];
}

function getWeek() {
    const today = new Date();

    let now = new Date();
    let dayOfWeek = now.getUTCDay();
    let diff = now.getUTCDate() - dayOfWeek + 1;
    let startOfWeek = new Date(now.getUTCFullYear(), now.getUTCMonth(), diff, 0, 0, 0);
    startOfWeek.setHours(startOfWeek.getHours() + 7);

    let endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return {
        start: formatDate(startOfWeek), end: formatDate(endOfWeek)
    };
}

function getMonth() {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    return {
        start: formatDate(startOfMonth), end: formatDate(endOfMonth)
    };
}

function formatDate(date) {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
}

module.exports = {getToday, getWeek, getMonth};
