const { ActionRowBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");
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
        return await this.interaction.reply({ content: '', embeds: [embed], components: [components], files: [], ephemeral: true });
    }

    /**
     * @param { String } message
     */

    async Info(message) {
        const embed = new Embed(this.client).Info(message);
        return await this.interaction.reply({ content: '', embeds: [embed], components: [], files: [], ephemeral: true });
    }

    /**
     * @param { String } message
     */

    async InfoEdit(message) {
        const embed = new Embed(this.client).Info(message);
        return await this.interaction.editReply({ content: '', embeds: [embed], components: [], files: [], ephemeral: true });
    }

    /**
     * @param { String } content 
     * @param { EmbedBuilder } embeds 
     * @param { ActionRowBuilder} components 
     * @param { AttachmentBuilder } files 
     * @param { Boolean } ephemeral 
     */

    async CustomSend(content, embeds, components, files, ephemeral) {
        return await this.interaction.reply({ content: content, embeds: embeds, components: components, files: files, fetchReply: true, ephemeral: ephemeral })
    }

    /**
     * @param { String } content 
     * @param { EmbedBuilder } embeds 
     * @param { ActionRowBuilder} components 
     * @param { AttachmentBuilder } files 
     * @param { Boolean } ephemeral 
     */

    async CustomEdit(content, embeds, components, files, ephemeral) {
        return await this.interaction.message.edit({ content: content, embeds: embeds, components: components, files: files, fetchReply: true, ephemeral: ephemeral })
    }

    /**
     * @param { import("discord.js").Channel } channel
     * @param { String } content 
     * @param { EmbedBuilder } embeds 
     * @param { ActionRowBuilder} components 
     * @param { AttachmentBuilder } files 
     */

    async CustomChannelSend(channel, content, embeds, components, files) {
        this.client.cluster.broadcastEval(async (c, { channelId, content, embeds, components, files }) => {
            const channel = c.channels.cache.get(channelId);
            if(channel) return await channel.send({ content: content, embeds: embeds, components: components, files: files })
        }, {
            context: {
                channelId: channel,
                content: content, 
                embeds: embeds, 
                components: components, 
                files: files
            }
        })
    }

}