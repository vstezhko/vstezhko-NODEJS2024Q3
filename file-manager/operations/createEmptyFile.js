const fs = require('fs');
const path = require('path');
const showError = require("../utils/showError");

async function createEmptyFile(fileName) {
    try {
        const filePath = path.join(process.cwd(), fileName);

        await fs.promises.writeFile(filePath, '', { flag: 'wx' });

    } catch (err) {
        if (err.code === 'EEXIST') {
            showError(`File "${fileName}" already exists.`);
        } else {
            showError(`Error creating file: ${err.message}`);
        }
    }
}

module.exports = createEmptyFile;
