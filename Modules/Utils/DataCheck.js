const { Error } = require('../Structures/Logs');
const { TOKEN_DISCORD, URL_MONGO } = process.env;

module.exports = class Checker {
    static isRunning = true;

    // ================= TOKENS =================

    static async tokenDiscord() {
        if(!TOKEN_DISCORD || TOKEN_DISCORD.startsWith("TOKEN_HERE")) {
            Error(`invalid discord token format in Configs/.env`);
            Checker.isRunning = false;
        }
    }
    
    // ================= URLS =================

    static async urlMongo() {
        if(!URL_MONGO || URL_MONGO.startsWith("URL_HERE")) {
            Error(`invalid mongo url format in Configs/.env`);
            Checker.isRunning = false;
        }
    }

    // ================= GLOBAL =================

    static async checkAllData() {
        await Checker.tokenDiscord();
        await Checker.urlMongo();
        return Checker.isRunning;
    }
}