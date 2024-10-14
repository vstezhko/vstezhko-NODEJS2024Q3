const os = require('os');

function getRootDirectory() {
    return os.homedir();
}

module.exports = getRootDirectory;
