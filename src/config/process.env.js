require("dotenv").config();

module.exports = {
    tokenBot: process.env.TOKEN,
    userId: process.env.USER_ID,
    botUserName: process.env.BOT_USERNAME,
    notionToken: process.env.NOTION_TOKEN,
    budgetTrackerDatabaseId: process.env.BUDGET_TRACKER_DATABASE_ID,

};

