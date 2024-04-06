const { Client } = require('discord.js');
const fs = require('fs');
const { Error, Process, Info, Debug } = require('../Structures/Logs');

module.exports = class Events {

    /**
     * @description register all event in discord collection
     * @param {Client} client 
     */

    static async registerEvents(client) {
        Process(`registration events in progress in cluster [${client.cluster.id}]`)

        const path = `${process.cwd()}/Events/`
        const eventFiles = fs
        .readdirSync(path)
        .filter((file) => file.endsWith('.js'));

        for (const file of eventFiles) {
            const event = require(`${path}${file}`);
            if (event.once) {
                client.once(event.name, async (...args) => {
                    await event.execute(...args, client)
                        .catch((err) => {
                            console.log(err)
                            Error(`can't load event ${event.name}`)
                        });
                });
            } else {
                client.on(event.name, async (...args) => {
                    await event.execute(...args, client)
                        .catch((err) => {
                            Debug(err)
                            Error(`can't load event ${event.name}`)
                        });
                })
            }
        }

        Info(`registration events finish in cluster [${client.cluster.id}]`)
    }

}