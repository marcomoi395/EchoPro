module.exports = (message) =>{
    const regex = /^(.*?)(?:\s+(\d{1,2}\/\d{1,2}))?(?:,\s*(.*))?$/;

    function extractParts(str) {
        const matches = str.match(regex);
        if (matches) {
            const part1 = matches[1].trim();
            const part2 = matches[2] ? matches[2].trim() : "";
            const part3 = matches[3] ? matches[3].trim() : "";

            return [part1, part2, part3];
        }
        return ["", "", ""];
    }

    const dataArray = [];
    const context = message.split("\n");
    context.forEach((item) => {
        dataArray.push(extractParts(item))
    })
    return dataArray;
}