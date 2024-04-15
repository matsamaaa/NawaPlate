const { PermissionsBitField, SlashCommandBuilder, Client, ActionRowBuilder } = require('discord.js');
const { reload, report } = require('../../../Modules/Structures/Buttons');

module.exports = {
    options: {
        nsfw: false,
        permissions: {
            bot: [PermissionsBitField.Flags.SendMessages],
            user: [PermissionsBitField.Flags.SendMessages]
        },
        dm: {
            only: false,
            authorize: true
        },
        maintenance: true,
        premium: false,
        slowmode: 600000 // time in miliseconds (10 min)
    },
    
    /**
     * @description The data of the help command.
     * @type {import('discord.js').ApplicationCommandData}
    */

    data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('test command')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.SendMessages)
    .setDMPermission(true), 
    
    /**
     * @param { import('discord.js').Interaction } interaction 
     */

    async execute (interaction, language) {

        const rows = new ActionRowBuilder()
            .addComponents(reload, report);

        return interaction.reply({ content: "test", components: [rows], ephemeral: true });

    },
    
    /**
     * @param { import('discord.js').Interaction } interaction 
     */
    
    async autocomplete (interaction) {
        
    }
}