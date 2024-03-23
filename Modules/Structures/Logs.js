const chalk = require("chalk")

module.exports = class Log {
    static Error(message) {
        console.error(`${chalk.bgHex('#ed3737').bold('ERROR')} ` + message)
    }

    static Process(message) {
        console.log(`${chalk.bgHex('#4373f7').bold('PROCESS')} ` + message)
    }

    static Info(message) {
        console.info(`${chalk.bgHex('#bd257e').bold('INFO')} ` + message)
    }

    static Debug(message) {
        console.log(`${chalk.bgHex('#d8e33d').bold('DEBUG')} ` + message)
    }
}