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

    static reload = new ButtonBuilder()
        .setCustomId('reload')
        .setLabel('Reload')
        .setEmoji('1123000117457342465')
        .setStyle(ButtonStyle.Primary);

    static report = new ButtonBuilder()
        .setCustomId('report')
        .setLabel('Report')
        .setEmoji('1226191138596323388')
        .setStyle(ButtonStyle.Danger)

}