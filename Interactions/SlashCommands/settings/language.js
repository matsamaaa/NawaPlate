const { PermissionsBitField, SlashCommandBuilder, ActionRowBuilder } = require('discord.js');
const Langs = require('../../../Configs/Langs');
const { Debug } = require('../../../Modules/Structures/Logs');
const Lang = require('../../../Modules/Managers/Lang');
const Sender = require('../../../Modules/Utils/Sender');
const Embed = require('../../../Modules/Structures/Embeds');

module.exports = {
    options: {
        nsfw: false,
        permissions: {
            bot: [PermissionsBitField.Flags.SendMessages],
            user: [PermissionsBitField.Flags.SendMessages]
        },
        dm: {
            only: false,
            authorize: true
        },
        maintenance: true,
        premium: false,
        slowmode: null
    },
    
    /**
     * @description The data of the help command.
     * @type {import('discord.js').ApplicationCommandData}
    */

    data: new SlashCommandBuilder()
    .setName('language')
    .setDescription('language setting')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.SendMessages)
    .setDMPermission(true)
    .addSubcommand(subCommand =>
        subCommand
            .setName('get')
            .setDescription('get your language setting'),
    )
    .addSubcommand(subCommand => 
        subCommand
            .setName('setup')
            .setDescription('setup your language setting')
            .addStringOption(option =>
                option
                    .setName('language')
                    .setDescription('language name')
                    .setAutocomplete(true)
                    .setRequired(true)
            ),
    ),

    /**
     * @param { import('discord.js').Interaction } interaction 
     */

    async execute (interaction, language) {

        const { options, member, client } = interaction;
        const db = new Lang(member.id);

        if(options.getSubcommand() === 'setup') {
            const lang = options.getString('language');
            if(await db.existUser()) await db.updateLang(lang);
            else await db.createLang(lang);
            
            const language = Langs[lang]
            return await new Sender(interaction).Info(language.commands['language_success']);
        } else {
            const embed = new Embed(client).Command()
                .setTitle(`📚 Language`)
                .setDescription(language.commands['language_desc'] + `**${language.name}**`);
        
            return await new Sender(interaction).CustomSend('', [embed], [], [], true);
        }

    }, 
    
    /**
     * @param { import('discord.js').Interaction } interaction 
     */
    
    async autocomplete (interaction) {

        const { options } = interaction;

        const languages = Object.keys(Langs);
        const focusedValue = options.getFocused(); // return actual value of user

        const languageChoices = languages.map(lang => ({ code: lang, name: Langs[lang].name }));
        const filteredLanguages = languageChoices.filter(lang => lang.name.toLowerCase().includes(focusedValue.toLowerCase()));
    
        await interaction.respond(
			filteredLanguages.map(choice => ({ name: choice.name, value: choice.code })),
		);
    }
}