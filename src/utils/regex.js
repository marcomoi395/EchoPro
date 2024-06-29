function checkRegexExpense(text) {
    const regexPattern = /^(.+?)\s(\d+)\s*(.+)?$/;
    return regexPattern.test(text);
}

module.exports = {checkRegexExpense};