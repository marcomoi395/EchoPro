const moment = require("moment");

module.exports = (message) => {
    function capitalizeSentence(input) {
        if (!input || typeof input !== "string") {
            return input;
        }

        let sentences = input.toLowerCase().split(". ");

        sentences = sentences.map((sentence) => {
            sentence = sentence.trim();
            if (sentence.length > 0) {
                sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
            }
            return sentence;
        });

        return sentences.join(". ");
    }

    const regex = /^(.*?)(?:\s+(\d{1,2}\/\d{1,2}))?(?:,\s*(.*))?$/;

    function extractParts(str) {
        const matches = str.match(regex);
        if (matches) {
            const currentYear = moment().year();
            const part1 = capitalizeSentence(matches[1]);
            let part2 = "";
            if (matches[2]) {
                part2 = moment(matches[2].trim(), "D/M")
                    .year(currentYear)
                    .format("YYYY-MM-DD");
            } else {
                part2 = moment().format("YYYY-MM-DD");
            }
            const part3 = matches[3] ? capitalizeSentence(matches[3]) : "";

            return [part1, part2, part3];
        } else return ["", "", ""];
    }

    const dataArray = [];
    const context = message.split("\n");
    context.forEach((item) => {
        dataArray.push(extractParts(item));
    });
    return dataArray;
};
