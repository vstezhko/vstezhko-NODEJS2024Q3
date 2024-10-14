function printCurrentDirectory() {
    const currentPath = process.cwd();
    console.log(`You are currently in ${currentPath}`);
}

module.exports = printCurrentDirectory;