const cooldownModel = require('../Mongo/Models/Cooldown');

module.exports = class Cooldown {

    /** 
     * @param  {String } memberId 
     */

    constructor(memberId) {
        this.memberId = memberId;
    }

    /**
     * @param { String } commandName
     * @param { Number } cooldown
     * @returns number of miliseconds
     */

    async getCooldown(commandName, cooldown) {
        const now = new Date();
        const dateCooldown = new Date(now - cooldown);
        const result = await cooldownModel.findOne({
            memberId: this.memberId,
            date: {
                $gte: dateCooldown
            },
            commandName: commandName
        });

        return result ? new Date(result.date).getTime() : 0;
    }

    /**
     * @param { String } guildId 
     * @param { String } commandName 
     * @returns cooldownModel
     */

    async createCooldown(guildId, commandName) {
        const result = new cooldownModel({
            memberId: this.memberId,
            guildId: guildId,
            date: new Date(),
            commandName: commandName
        })

        await result.save();
        return result;
    }
}