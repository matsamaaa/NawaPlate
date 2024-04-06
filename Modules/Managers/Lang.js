const { GuildMember } = require("discord.js");
const langModel = require('../Mongo/Models/Lang');
const Langs = require("../../Configs/Langs");
const { Debug } = require("../Structures/Logs");

module.exports = class Lang {

    /**
     * @param { GuildMember.id } id 
     */

    constructor(id) {
        this.memberId = id;
    }

    async createLang(lang) {

    }

    /**
     * @param { String } locale 
     * @returns a string of language
     */

    async getLang(locale) {
        let lang = await langModel.findOne({ memberId: this.memberId });
        if(!lang || !Langs[lang]) lang = Langs[locale] ? locale : 'en-US';

        return lang;
    }

}