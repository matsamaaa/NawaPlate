const { ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = class Buttons {

    static contactDev = new ButtonBuilder()
        .setLabel('Contact Staff')
        .setURL('https://discord.gg/JA4b3pDYZF')
        .setStyle(ButtonStyle.Link)
        .setDisabled(false);
    
}