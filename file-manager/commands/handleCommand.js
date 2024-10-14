const changeDirectory = require('../operations/changeDirectory');
const listDirectory = require('../operations/listDirectory');
const upperDirectory = require("../operations/upperDirectory");

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
                await listDirectory();
                break;

            case 'up':
                await upperDirectory();
                break;


            default: showInfo('Unknown operation')
        }

        printCurrentDirectory();

    } catch (err) {
       showError(err.message);
    }
}

module.exports = handleCommand;
