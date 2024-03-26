const { Client } = require('discord.js');
const fs = require('fs');
const { Error, Info, Process } = require('../Structures/Logs');

module.exports = class Interactions {

    /**
     * @param { Client } client 
     */

    static async loadCommands(client) {
        Process(`loading commands in progress in cluster [${client.cluster.id}]`)

        const path = `${process.cwd()}/Interactions/SlashCommands/`;
        const slashCommands = fs.readdirSync(path);

        for(const module of slashCommands) {
            const testFolder = fs.statSync(`${path}${module}`); // test if it's an folder
            if(testFolder.isDirectory()) {
                const commandFiles = fs
                .readdirSync(`${path}${module}`)
                .filter((file) => file.endsWith('.js'));

                for (const file of commandFiles) {
                    const command = require(`${path}${module}/${file}`);
                    const slashCommand = client.slashCommand.get(command.data.name);
                    if(slashCommand) client.application.commands.set(command.data);
                    else Error(`can't load the command ${command.data.name}`);
                }
            }
        }

        Info(`loading commands finish in cluster [${client.cluster.id}]`)
    }

}