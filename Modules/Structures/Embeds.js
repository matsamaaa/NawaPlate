const { EmbedBuilder, Client } = require('discord.js');

module.exports = class Embed {

    /**
     * @param { Client } client 
     */

    constructor(client) {
        this.client = client;

        this.Base = new EmbedBuilder()
        .setTimestamp(new Date())
        .setFooter({ 
            text: this.client.user.username, 
            iconURL: this.client.user.displayAvatarURL({ dynamic: true }) 
        });
    }

    Error(errorMessage) {
        return new EmbedBuilder(this.Base)
            .setColor('#ed5e4e')
            .setDescription(errorMessage);
    }
    
}