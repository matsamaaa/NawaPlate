const Modals = require('../../Modules/Structures/Modals')

module.exports = {
    options: {
        maintenance: false,
        premium: false
    },
    defer: false,
    id: 'report',

    /**
     * @param { import('discord.js').Interaction } interaction 
     */

    async execute (interaction, language) {

        await interaction.showModal(new Modals('report', 'Report Example').report());

    }
}