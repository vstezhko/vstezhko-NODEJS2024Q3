const fs = require('fs');
const path = require('path');
const showError = require("../utils/showError");

async function listDirectory() {
    try {
        const currentDir = process.cwd();
        const filesAndDirs = await fs.promises.readdir(currentDir);

        const items = await Promise.all(filesAndDirs.map(async (item) => {
            const itemPath = path.join(currentDir, item);
            const stats = await fs.promises.stat(itemPath);

            return {
                name: item,
                type: stats.isDirectory() ? 'directory' : 'file',
            };
        }));

        const directories = items.filter(item => item.type === 'directory').sort((a, b) => a.name.localeCompare(b.name));
        const files = items.filter(item => item.type === 'file').sort((a, b) => a.name.localeCompare(b.name));

        const sortedItems = [...directories, ...files];

        console.log(`|(index)| Name                                     | Type       |`);
        console.log(`|---------|------------------------------------------|------------|`);

        sortedItems.forEach((item, index) => {
            const indexStr = String(index).slice(0, 7).padEnd(7);
            const nameStr = item.name.slice(0,40).padEnd(40);
            const typeStr = item.type.slice(0, 10).padEnd(10);

            console.log(`| ${indexStr} | ${nameStr} | ${typeStr} |`);
        });
    } catch (error) {
        showError(error.message);
    }
}

module.exports = listDirectory;
