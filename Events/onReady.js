const { Client } = require('discord.js');
const chalk = require('chalk');
const status = require('../Modules/Utils/updateStatus');
const Interactions = require('../Modules/Utils/LoadInteractions');
const { VERSION } = require('../Configs/Datas');
const { Info } = require('../Modules/Structures/Logs');

module.exports = {
    name: 'ready',
    once: true,
    maintenance: false,

    /**
     * @param { Client } client 
     */

    async execute (client) {

        // Log Connexion
        client.login(client.cluster.process.ChildClient);

        [
            chalk.whiteBright(``),
            chalk.whiteBright(`NawaPlate ${chalk.bold.blueBright(`v${VERSION}`)} cluster [${chalk.bold.blueBright(client.cluster.id)}] is now online`),
            chalk.whiteBright(``),
        ].forEach((line) => Info(line));

        await status.update(client);

        await Interactions.loadCommands(client);

    }
}