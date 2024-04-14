module.exports = {
    options: {
        maintenance: false,
        premium: false
    },
    id: 'reload',

    /**
     * @param { import('discord.js').Interaction } interaction 
     */

    async execute (interaction, language) {

        const { message } = interaction;
        return await message.edit({ content: message.content });

    }
}