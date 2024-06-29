const notion = require("../services/notionService");

module.exports = (messageFormat, type) => {
    if (messageFormat != null) {
        const data = {
            type: type,
        };

        if (type === 'Expense') {
            data.typeId = 'th^v';
            data.typeColor = 'red';
        } else {
            data.typeId = 'BhO{';
            data.typeColor = 'green';
        }

        if (messageFormat[1]) {
            data.description = messageFormat[1];
        } else {
            return false;
        }

        if (messageFormat[2]) {
            data.amount = parseInt(messageFormat[2]);
        } else {
            return false;
        }

        data.note = messageFormat[3] ? messageFormat[3] : "";

        notion.addPageBudgetTracker(data);

        return true;
    } else {
        return false;
    }
};
