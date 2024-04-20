const Sender = require('../../Modules/Utils/Sender');

module.exports = {
    options: {
        maintenance: false,
        premium: false
    },
    defer: false,
    id: 'reload',

    /**
     * @param { import('discord.js').Interaction } interaction 
     */

    async execute (interaction, language) {

        const { message } = interaction;
        await interaction.deferUpdate();
        await new Sender(interaction).CustomEdit(message.content, message.embeds, message.components, message.attachments, false);
    
    }
}