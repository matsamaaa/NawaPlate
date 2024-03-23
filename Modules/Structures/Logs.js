const chalk = require("chalk")

module.exports = class Log {
    static Error(message) {
        console.error(`${chalk.bgRed.white.bold(' ERROR ')} » ` + message)
    }

    static Process(message) {
        console.log(`${chalk.bgBlue.white.bold('PROCESS')} » ` + message)
    }

    static Info(message) {
        console.info(`${chalk.white.bgHex('#bd257e').bold(' INFO  ')} » ` + message)
    }

    static Debug(message) {
        console.log(`${chalk.bgGrey.white.bold(' DEBUG ')} » ` + message)
    }
}