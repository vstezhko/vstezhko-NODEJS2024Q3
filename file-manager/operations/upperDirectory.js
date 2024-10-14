const fs = require('fs').promises;
const getRootDirectory = require("../utils/getRootDirectory");
const isWithinRoot = require("../utils/isWithinRoot");
const showInfo = require("../utils/showInfo");
const showError = require("../utils/showError");

async function upperDirectory() {
    try {
        const rootDirectory = getRootDirectory();
        const currentDirectory = process.cwd()
        const targetDirectory = [...currentDirectory.split('/')].slice(0, currentDirectory.split('/').length - 1).join('/')

        if (isWithinRoot(targetDirectory, rootDirectory)) {
            const stats = await fs.stat(targetDirectory);
            if (stats.isDirectory()) {
                process.chdir(targetDirectory);
            } else {
                showInfo('such catalog doesn\`t exist');
            }
        }

    } catch (err) {
        showError(err.message);
        throw err;
    }
}

module.exports = upperDirectory;