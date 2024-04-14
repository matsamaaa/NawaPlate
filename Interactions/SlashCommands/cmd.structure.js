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
    .setName('example')
    .setDescription('example descritpion')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.SendMessages)
    .setDMPermission(true), 
    
    /**
     * @param { import('discord.js').Interaction } interaction 
     */

    async execute (interaction) {

        const { client, guild, member } = interaction;

    }, 
    
    /**
     * @param { import('discord.js').Interaction } interaction 
     */
    
    async autocomplete (interaction, language) {

    }
}