const { Client, Collection } = require('discord.js');
const fs = require('fs');
const { Error } = require('../Structures/Logs');

module.exports = class Events {

    /**
     * @description register all event in discord collection
     * @param {Client} client 
     */

    static async registerEvents(client) {
        const eventFiles = fs
        .readdirSync(`${__dirname}/Events`)
        .filter((file) => file.endsWith('.js'))
    
        for (const file of eventFiles) {
            const event = require(`${__dirname}/events/${file}`)
            if (event.once) {
                client.once(event.name, async (...args) => {
                    await event.execute(...args, client)
                        .catch((err) => {
                            Error(`can't load event ${event.name}`)
                        });
                });
            } else {
                client.on(event.name, async (...args) => {
                    await event.execute(...args, client)
                        .catch((err) => {
                            Error(`can't load event ${event.name}`)
                        });
                })
            }
        }
    }

}