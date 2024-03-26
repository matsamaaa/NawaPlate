const { Client, Collection } = require('discord.js');
const chalk = require('chalk');
const fs = require('fs');
const { Process, Info } = require('../Structures/Logs');

module.exports = class Commands {

    /**
     * @param { Client } client 
     */

    static async registerCommands(client) {
        Process(`registration commands in progress in cluster [${chalk.bold.blueBright(client.cluster.id)}]`)

        client.slashCommands = new Collection();
        const path = `${process.cwd()}/Interactions/SlashCommands/`
        const slashCommands = fs.readdirSync(path);
        let commandsLength = 0;

        for (const module of slashCommands) {
            const testFolder = fs.statSync(`${path}${module}`); // test if it's an folder
            if(testFolder.isDirectory()) {
                const commandFiles = fs
                .readdirSync(`${path}${module}`)
                .filter((file) => file.endsWith('.js'));

                for (const file of commandFiles) {
                    const command = require(`${path}${module}/${file}`);
                    client.slashCommands.set(command.data.name, command);
                    commandsLength++;
                }
            }
        }

        Info(`registration of ${commandsLength} commands finish in cluster [${chalk.bold.blueBright(client.cluster.id)}]`)
    }

}