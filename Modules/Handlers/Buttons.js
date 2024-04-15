const { Client, Collection } = require('discord.js');
const fs = require('fs');

module.exports = class Buttons {

    /**
     * @param { Client } client 
     */

    static async registerButtons(client) {
        
        client.buttonsCommands = new Collection();
        const path = `${process.cwd()}/Interactions/Buttons/`;
        const buttonsCommands = fs.readdirSync(path)
            .filter(file => file.endsWith('.js'));

        for (const button of buttonsCommands) {
            const buttonFile = require(`${path}/${button}`);
            client.buttonsCommands.set(buttonFile.id, buttonFile);
        }

    }

}