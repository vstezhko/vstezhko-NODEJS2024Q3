const path = require('path');
const os = require('os');


function isWithinRoot(targetPath, rootDirectory) {
    const normalizedTarget = path.resolve(targetPath);
    const normalizedRoot = path.resolve(rootDirectory);

    // On Windows, paths are case-insensitive
    if (os.platform() === 'win32') {
        return normalizedTarget.toLowerCase().startsWith(normalizedRoot.toLowerCase());
    } else {
        return normalizedTarget.startsWith(normalizedRoot);
    }
}

module.exports = isWithinRoot;
