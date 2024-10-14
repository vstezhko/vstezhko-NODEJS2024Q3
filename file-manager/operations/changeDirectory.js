const fs = require('fs').promises;
const path = require('path');
const getRootDirectory = require('../utils/getRootDirectory');
const isWithinRoot = require('../utils/isWithinRoot');
const showError = require("../utils/showError");
const showInfo = require("../utils/showInfo");


async function changeDirectory(newPath) {
    try {
        const rootDirectory = getRootDirectory();
        const resolvedPath = path.resolve(newPath);

        if (isWithinRoot(resolvedPath, rootDirectory)) {
            const stats = await fs.stat(resolvedPath);
            if (stats.isDirectory()) {
                process.chdir(resolvedPath);
            } else {
                showInfo('such catalog doesn\`t exist');
            }
        }
    } catch (err) {
        showError(err.message);
        throw err;
    }
}

module.exports = changeDirectory;
