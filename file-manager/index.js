const process = require('process');
const readline = require('readline');
const os = require('os');
const parseArgs = require('./utils/parseArgs');
const printCurrentDirectory = require('./utils/printCurrentDirectory');
const handleCommand = require('./commands/handleCommand');

const args = process.argv.slice(2);
const parsedArgs = parseArgs(args);

// hello message + printCurrentDirectory
if (!parsedArgs.username) {
    return console.error('No username provided');
}
console.log(`Welcome to the File Manager, ${parsedArgs.username}!`);


// change start directory to homedir
const homeDirectory = os.homedir();
function setStartingDirectory(directory) {
    try {
        process.chdir(directory);
        console.log(`Starting in the user's home directory: ${directory}`);
    } catch (err) {
        console.error(`Failed to change directory to ${directory}: ${err.message}`);
        console.error('Exiting the application.');
        process.exit(1);
    }
}
setStartingDirectory(homeDirectory);
printCurrentDirectory();


// exit message on Ctrl + C
const exitHandler = () => {
    console.log(`\nThank you for using File Manager, ${parsedArgs.username}, goodbye!`);
    process.exit();
};
process.on('SIGINT', exitHandler);



// interface for reading console inputs
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.on('line', (input) => {
    const trimmedInput = input.trim();

    if (trimmedInput === '.exit') {
        exitHandler();
    } else {
        handleCommand(trimmedInput);
    }

    rl.prompt();
});

rl.setPrompt('> ');
rl.prompt();

rl.on('close', () => {
    exitHandler();
});
