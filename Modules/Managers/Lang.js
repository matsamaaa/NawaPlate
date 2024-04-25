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

    /**
     * @param { String } lang 
     */

    async createLang(lang) {
        const result = new langModel({
            memberId: this.memberId,
            lang: lang
        });

        await result.save();
    }

    async existUser() {
        const result = await langModel.findOne({ 
            memberId: this.memberId 
        });

        return !!result;
    }

    /**
     * @param { String } locale 
     * @returns a string of language
     */

    async getLang(locale) {
        let lang = await langModel.findOne({ memberId: this.memberId });
        if(!lang || !Langs[lang.lang]) lang = Langs[locale] ? locale : 'en-US';
        else lang = lang.lang;

        return lang;
    }

    /**
     * @param { String } lang 
     */

    async updateLang(lang) {
        const result = await langModel.findOneAndUpdate({
            memberId: this.memberId
        }, {
            lang: lang
        });

        result.save();
    }

}