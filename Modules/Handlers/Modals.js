const { Client, Collection } = require('discord.js');
const fs = require('fs');

module.exports = class Modals {

    /**
     * @param { Client } client 
     */

    static async registerModals(client) {
        
        client.modalsCommands = new Collection();
        const path = `${process.cwd()}/Interactions/Modals/`;
        const modalsCommands = fs.readdirSync(path)
            .filter(file => file.endsWith('.js'));

        for (const modal of modalsCommands) {
            const modalFile = require(`${path}/${modal}`);
            client.modalsCommands.set(modalFile.id, modalFile);
        }

    }

}