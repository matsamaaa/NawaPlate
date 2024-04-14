const { ActionRowBuilder, EmbedBuilder } = require("discord.js");
const Embed = require("../Structures/Embeds");
const Buttons = require("../Structures/Buttons");
const { Debug } = require("../Structures/Logs");

module.exports = class Sender {

    /**
     * @param { import("discord.js").Interaction } interaction 
     */

    constructor(interaction) {
        this.interaction = interaction;
        this.client = this.interaction.client;
    }

    /**
     * @param { String } message
     */

    async Error(message) {
        const embed = new Embed(this.client).Error(message);
        const components = new ActionRowBuilder().addComponents(Buttons.contactDev, Buttons.status);
        await this.interaction.reply({ content: '', embeds: [embed], components: [components], files: [], ephemeral: true });
    }

}