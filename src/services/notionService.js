const {Client} = require('@notionhq/client');
const fs = require('fs');
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

module.exports.getTodoList = async (ctx) => {
    const databaseId = config.toDoListDatabaseId;

    const response = await notion.databases.query({
        database_id: databaseId,
    });

    console.log(response);
    const jsonResponse = JSON.stringify(response, null, 2);

    fs.writeFile('response.json', jsonResponse, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('Response saved to response.json');
        }
    });
}


module.exports.addToDoList = async (dataArray) => {
    try {
        // Tạo mảng các promises
        const promises = dataArray.map(data => axios.post(
            `https://api.notion.com/v1/pages`,
            {
                parent: { database_id: config.toDoListDatabaseId },
                properties: {
                    "Priority": {
                        "id": "%3DJ%5Co",
                        "type": "status",
                        "status": {
                            "id": "N\\O|",
                            "name": "Medium",
                            "color": "blue"
                        }
                    },
                    "Date": {
                        "id": "JQ%5CO",
                        "type": "date",
                        "date": {
                            "start": "2024-06-29",
                            "end": null,
                            "time_zone": null
                        }
                    },
                    // "Courses": {
                    //     "id": "M%5CJU",
                    //     "type": "relation",
                    //     "relation": [
                    //         {
                    //             "id": "3e4c4a43-0126-454e-8760-86c2437d1b85"
                    //         }
                    //     ],
                    //     "has_more": false
                    // },
                    "Checkbox": {
                        "id": "fUEg",
                        "type": "checkbox",
                        "checkbox": false
                    },
                    "Description": {
                        "id": "xZYN",
                        "type": "rich_text",
                        "rich_text": [
                            {
                                "type": "text",
                                "text": {
                                    "content": "description 2",
                                    "link": null
                                },
                                "annotations": {
                                    "bold": false,
                                    "italic": false,
                                    "strikethrough": false,
                                    "underline": false,
                                    "code": false,
                                    "color": "default"
                                },
                                "plain_text": "description 2",
                                "href": null
                            }
                        ]
                    },
                    "Deleted": {
                        "id": "zT%5B%7C",
                        "type": "status",
                        "status": {
                            "id": "7633e622-87bf-4013-8be5-1b3b9be67695",
                            "name": "false",
                            "color": "default"
                        }
                    },
                    "Name": {
                        "id": "title",
                        "type": "title",
                        "title": [
                            {
                                "type": "text",
                                "text": {
                                    "content": "Test44",
                                    "link": null
                                },
                                "annotations": {
                                    "bold": false,
                                    "italic": false,
                                    "strikethrough": false,
                                    "underline": false,
                                    "code": false,
                                    "color": "default"
                                },
                                "plain_text": "Test 4",
                                "href": null
                            }
                        ]
                    }
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${config.notionToken}`,
                    accept: 'application/json',
                    'Notion-Version': '2022-06-28',
                    'content-type': 'application/json'
                },
            }
        ));

        // Chờ tất cả các promises hoàn thành
        // await Promise.all(promises);
    } catch (error) {
        console.error('Error creating pages:', error.response ? error.response.data : error.message);
        return false;
    }
};