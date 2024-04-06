const { checkMaintenance } = require('../Modules/Utils/DataChecker');
const Sender = require('../Modules/Utils/Sender');
const Langs = require('../Configs/Langs');
const { Debug } = require('../Modules/Structures/Logs');
const InteractionChecker = require('../Modules/Utils/InteractionsChecker');
const Lang = require('../Modules/Managers/Lang');

module.exports = {
    name: 'interactionCreate',
    once: false,
    maintenance: false,

    /**
     * @param { import('discord.js').Interaction } interaction 
     */

    async execute (interaction) {

        if(!interaction) return;

        const { client, locale, member } = interaction;
        const language = Langs[await new Lang(member.id).getLang(locale)];

        // Check maintenance
        if(InteractionChecker.globalMaintenance()) return await new Sender(interaction).Error(language.errors['bot_maintenance']);
        
        /*
        if(interaction.isChatInputCommand()) {
            const command = interaction.commandName;
            const cmd = client.slashCommands.get(commandName);

            //check slowmode

            if(cmd && !cmd.options.maintenance) {

            }
        }
*/
    }
}