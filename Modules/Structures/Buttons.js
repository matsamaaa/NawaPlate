const { ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = class Buttons {

    static contactDev = new ButtonBuilder()
        .setLabel('Contact Staff')
        .setURL('https://discord.gg/JA4b3pDYZF')
        .setStyle(ButtonStyle.Link)
        .setDisabled(false);
    
    static status = new ButtonBuilder()
        .setLabel('Status')
        .setURL('https://status.nawashu.xyz/')
        .setStyle(ButtonStyle.Link)
        .setDisabled(false);

    static leftArrow = new ButtonBuilder()
        .setCustomId('left-arrow')
        .setLabel('◀')
        .setStyle(ButtonStyle.Primary);

    static rightArrow = new ButtonBuilder()
        .setCustomId('right-arrow')
        .setLabel('▶')
        .setStyle(ButtonStyle.Primary);

}