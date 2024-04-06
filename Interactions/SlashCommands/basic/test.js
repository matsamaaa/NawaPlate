const { PermissionsBitField, SlashCommandBuilder, Client } = require('discord.js');

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
        maintenance: false,
        premium: false,
        slowmode: null // time in miliseconds
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
     * @param { Client } client 
     */

    async execute (interaction, client) {

        return interaction.reply({ content: "test", ephemeral: true });

    }, 
    
    /**
     * @param { import('discord.js').Interaction } interaction 
     */
    
    async autocomplete (interaction) {

    }
}