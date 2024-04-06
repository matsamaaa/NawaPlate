const { checkMaintenance } = require('../Modules/Utils/DataChecker');
const Sender = require('../Modules/Utils/Sender');
const Langs = require('../Configs/Langs');
const { Debug, Error } = require('../Modules/Structures/Logs');
const InteractionChecker = require('../Modules/Utils/InteractionsChecker');
const Lang = require('../Modules/Managers/Lang');
const { DEVELOPPERS } = require('../Configs/Datas');
const Cooldown = require('../Modules/Managers/Cooldown');

module.exports = {
    name: 'interactionCreate',
    once: false,
    maintenance: false,

    /**
     * @param { import('discord.js').Interaction } interaction 
     */

    async execute (interaction) {

        if(!interaction) return;

        const { client, locale, member, guild, commandName } = interaction;
        const language = Langs[await new Lang(member.id).getLang(locale)];

        // Check maintenance
        if(InteractionChecker.globalMaintenance() && !DEVELOPPERS.includes(member.id)) return await new Sender(interaction).Error(language.errors['bot_maintenance']);
        
        if(interaction.isChatInputCommand()) {
            const cmd = client.slashCommands.get(commandName);

            // check command maintenance
            if(!cmd) return;
            if(cmd.options.maintenance && !DEVELOPPERS.includes(member.id)) return await new Sender(interaction).Error(language.errors['interaction_maintenance']);

            // check perm
            const clientMember = interaction.guild.members.cache.get(client.user.id);
            if(!clientMember.permissions.has(cmd.options.permissions.bot[0])) return await new Sender(interaction).Error(language.errors['permission_missing_bot']);
            if(!member.permissions.has(cmd.options.permissions.user[0])) return await new Sender(interaction).Error(language.errors['permission_missing_user']);

            // check slowmode
            if(cmd.options.slowmode) {
                const slowmode = await new Cooldown(member.id).getCooldown(commandName, cmd.options.slowmode);
                if(slowmode > 0) return await new Sender(interaction).Error(language.errors['slowmode'] + ` (${Math.round((cmd.options.slowmode - (new Date().getTime() - slowmode)) / 1000) }s)`);
            }

            // check nsfw
            if(cmd.options.nsfw) return await new Sender(interaction).Error(language.errors['nsfw_channel']);

            cmd.execute(interaction, language)
                .then(() => {
                    new Cooldown(member.id).createCooldown(guild.id, commandName);
                })
                .catch(() => Error(`can't load interaction ${commandName} execute by ${member.id} in ${guild.id}`))
        }

    }
}