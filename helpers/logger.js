const chalk = require('chalk');
const log = console.log;
const logger = {};

logger.event = (text) => {
    log(chalk.black.bgYellow(" "+text+" "));
}
logger.data = (text) => {
    log(chalk.black.bgWhite(" "+text+" "));
}
logger.error = (text) => {
    log(chalk.white.bgRed(" "+text+" "));
}
module.exports = logger;
