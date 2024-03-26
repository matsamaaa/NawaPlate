const dateFormat = require('dateformat');
const chalk = require("chalk")

const date = dateFormat(new Date(), 'dd/mm/yy HH:MM:ss');
module.exports = class Log {

    /**
     * @param {String} message 
     */

    static Error(message) {
        console.error(`${chalk.bgRed.white.bold(' ERROR ')} [${date}] » ` + message)
    }

    static Warn(message) {
        console.error(`${chalk.white.bgHex('#6e3ad6').bold(' WARN  ')} [${date}] » ` + message)
    }

    static Process(message) {
        console.log(`${chalk.bgBlue.white.bold('PROCESS')} [${date}] » ` + message)
    }

    static Info(message) {
        console.info(`${chalk.white.bgHex('#bd257e').bold(' INFO  ')} [${date}] » ` + message)
    }

    static Debug(message) {
        console.log(`${chalk.bgGrey.white.bold(' DEBUG ')} [${date}] » ` + message)
    }
}