const chalk = require('chalk');
const { MAINTENANCE } = require('../../Configs/Datas');
const { Error, Warn, Info } = require('../Structures/Logs');
const { TOKEN_DISCORD, URL_MONGO_INTERNAL, URL_MONGO_EXTERNAL } = process.env;

module.exports = class DataChecker {
    static isRunning = true;

    // ================= TOKENS =================

    static async tokenDiscord() {
        if(!TOKEN_DISCORD || TOKEN_DISCORD.startsWith("TOKEN_HERE")) {
            Error(`invalid discord token format in Configs/.env`);
            DataChecker.isRunning = false;
        }
    }
    
    // ================= URLS =================

    static async urlMongo() {
        let internalMongo = true, 
            externalMongo = true;

        // check internal URL
        if(!URL_MONGO_INTERNAL || !URL_MONGO_INTERNAL.toLowerCase().startsWith("mongodb://")) {
            Warn(`invalid internal mongo url format in Configs/.env`);
            internalMongo = false;
        }

        // check external URL
        if(!URL_MONGO_EXTERNAL || !URL_MONGO_EXTERNAL.toLowerCase().startsWith("mongodb://")) {
            Warn(`invalid external mongo url format in Configs/.env`);
            externalMongo = false;
        }

        // check all mongos
        if(!internalMongo && !externalMongo) {
            Error(`invalid mongo url format in Configs/.env`);
            DataChecker.isRunning = false;
        }
    }

    // ================= MAINTENANCE =================

    static async checkMaintenance() {
        const status = MAINTENANCE ? chalk.bold.green('ENABLE') : chalk.bold.red('DISABLE');
        Info(`maintenance is ${status}`);
    }

    // ================= GLOBAL =================

    static async checkAllData() {
        await DataChecker.tokenDiscord();
        await DataChecker.urlMongo();
        return DataChecker.isRunning;
    }
}