const fs = require('fs')
const path = require('path');
const showError = require("../utils/showError");

async function readAndPrint(filePath) {
    const resolvedPath = path.resolve(filePath);

    const readStream = fs.createReadStream(resolvedPath, { encoding: 'utf8' });

    readStream.on('data', (chunk) => {
        process.stdout.write(chunk);
    });

    readStream.on('end', () => {
        console.log('\n');
    });

    readStream.on('error', (err) => {
        showError(`Error reading file: ${err.message}`);
    });
}

module.exports = readAndPrint;
