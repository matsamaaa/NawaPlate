const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");

module.exports = class Modals {

    constructor(id, title) {
        this.id = id;
        this.title = title

        this.modal = new ModalBuilder()
            .setCustomId(this.id)
            .setTitle(this.title);
    }

    report() {
        const input = new TextInputBuilder()
            .setCustomId('report')
            .setLabel('❓ Report reason')
            .setStyle(TextInputStyle.Paragraph)
            .setMaxLength(300)
            .setMinLength(5)
            .setPlaceholder('Enter your report reason.')
            .setRequired(true);

        const rows = new ActionRowBuilder().addComponents(input);
        this.modal.addComponents(rows);

        return this.modal;
    }

}