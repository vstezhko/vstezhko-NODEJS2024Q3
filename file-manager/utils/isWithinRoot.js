const path = require('path');
const os = require('os');

function isWithinRoot(targetPath, rootDirectory) {

    const normalizedTarget = path.resolve(targetPath);
    const normalizedRoot = path.resolve(rootDirectory);
    console.log(normalizedRoot)


    const targetParts = normalizedTarget.split(path.sep);
    const rootParts = normalizedRoot.split(path.sep);

    console.log(targetParts)
    console.log(rootParts)


    for (let i = 0; i < rootParts.length; i++) {
        if (os.platform() === 'win32') {
            if (targetParts[i].toLowerCase() !== rootParts[i].toLowerCase()) {
                return false;
            }
        } else {
            if (targetParts[i] !== rootParts[i]) {
                return false;
            }
        }
    }

    return true;
}

module.exports = isWithinRoot;
