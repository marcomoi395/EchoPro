const {Client} = require('@notionhq/client');
const axios = require('axios');
const config = require('../config/process.env');
const getTime = require('../utils/getTime');

const notion = new Client({auth: config.notionToken});

module.exports.getBudgetTrackerByTime = async (time, type) => {
    const databaseId = config.budgetTrackerDatabaseId;
    const today = new Date().toISOString().split('T')[0];

    let response;
    if (time === 'today') {
        response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                and: [
                    {
                        property: 'Created time',
                        date: {
                            equals: today,
                        },
                    },
                    {
                        property: 'Type',
                        select: {
                            equals: type,
                        },
                    }
                ],

            },
        });
    } else {
        let start, end;
        if (time === 'week') {
            start = getTime.getWeek().start;
            end = getTime.getWeek().end;
        } else {
            start = getTime.getMonth().start;
            end = getTime.getMonth().end;
        }

        response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                and: [
                    {
                        property: 'Created time',
                        date: {
                            on_or_after: start,
                        },
                    },
                    {
                        property: 'Created time',
                        date: {
                            on_or_before: end,
                        },
                    },
                    {
                        property: 'Type',
                        select: {
                            equals: type,
                        },
                    }
                ],
            }
        });
    }


    let totalAmount = 0;

    response.results.forEach(page => {
        if (page.properties.Amount.number !== null) {
            totalAmount += page.properties.Amount.number;
        }
    });

    return totalAmount;
};

module.exports.addPageBudgetTracker = async (data) => {
    try {
        const response = await axios.post(
            `https://api.notion.com/v1/pages`,
            {
                parent: {database_id: config.budgetTrackerDatabaseId},
                properties: {
                    "Note": {
                        "id": "%3Ck%3Dn",
                        "type": "rich_text",
                        "rich_text": [
                            {
                                "type": "text",
                                "text": {
                                    "content": data.note,
                                    "link": null
                                },
                            }
                        ]
                    },
                    "Type": {
                        "id": "ZBTi",
                        "type": "select",
                        "select": {
                            "id": data.typeId,
                            "name": data.type,
                            "color": data.typeColor,
                        }
                    },
                    "Amount": {
                        "id": "ugl%3C",
                        "type": "number",
                        "number": data.amount
                    },
                    "Description": {
                        "id": "title",
                        "type": "title",
                        "title": [
                            {
                                "type": "text",
                                "text": {
                                    "content": data.description,
                                    "link": null
                                },
                            }
                        ]
                    }
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${config.notionToken}`,
                    accept: 'application/json',
                    'Notion-Version': '2022-06-28',
                    'content-type': 'application/json'
                },
            }
        );

        return "Successfully";
    } catch (error) {
        console.error('Error creating page:', error.response.data);
        return "Error";
    }
};
