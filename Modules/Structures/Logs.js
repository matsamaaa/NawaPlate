const dateFormat = require('dateformat');
const chalk = require("chalk")
module.exports = class Log {

    static Date() {
        return dateFormat(new Date(), 'dd/mm/yy HH:MM:ss');
    }

    /**
     * @param {String} message 
     */

    static Error(message) {
        console.error(`${chalk.bgRed.white.bold(' ERROR ')} [${Log.Date()}] » ` + message)
    }

    static Warn(message) {
        console.error(`${chalk.white.bgHex('#6e3ad6').bold(' WARN  ')} [${Log.Date()}] » ` + message)
    }

    static Process(message) {
        console.log(`${chalk.bgBlue.white.bold('PROCESS')} [${Log.Date()}] » ` + message)
    }

    static Info(message) {
        console.info(`${chalk.white.bgHex('#bd257e').bold(' INFO  ')} [${Log.Date()}] » ` + message)
    }

    static Debug(message) {
        console.log(`${chalk.bgGrey.white.bold(' DEBUG ')} [${Log.Date()}] » ` + message)
    }
}