const chalk = require('chalk');
const log = console.log;
const logger = {};

logger.event = (text) => {
    log(chalk.black.bgYellow(" "+text+" "));
}
logger.data = (text) => {
    log(chalk.black.bgWhite(" "+text+" "));
}

module.exports = logger;
