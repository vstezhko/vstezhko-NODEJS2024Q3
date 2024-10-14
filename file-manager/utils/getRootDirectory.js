const path = require('path');
const os = require('os');

function getRootDirectory() {
    const currentPath = process.cwd();

    if (os.platform() === 'win32') {
        // On Windows, the root is the drive letter followed by ':\'
        const drive = currentPath.split(path.sep)[0];
        return `${drive}:\\`;
    } else {
        // On Unix-like systems, the root is '/'
        return '/';
    }
}

module.exports = getRootDirectory;
