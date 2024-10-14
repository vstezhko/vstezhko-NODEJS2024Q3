// commands/handleCommand.js
const changeDirectory = require('../operations/changeDirectory');
const listDirectory = require('../operations/listDirectory');

const printCurrentDirectory = require('../utils/printCurrentDirectory');
const showError = require("../utils/showError");
const showInfo = require("../utils/showInfo");


async function handleCommand(input) {
    const [command, ...args] = input.split(' ');

    try {
        switch (command) {

            case 'cd':
                if (args.length !== 1) {
                    showError('target path isn\'t provided')
                } else {
                    await changeDirectory(args[0]);
                }
                break;

            case 'ls':
                await listDirectory(command);
                break;


            default: showInfo('Unknown operation')
        }

        printCurrentDirectory();

    } catch (err) {
        // Todo properly handle error
        console.error(`error ${err.message}`);
    }
}

module.exports = handleCommand;
