const { PermissionsBitField, SlashCommandBuilder, Client, ActionRowBuilder } = require('discord.js');
const fs = require('fs');
const { leftArrow, rightArrow, contactDev } = require('../../../Modules/Structures/Buttons');
const Embed = require('../../../Modules/Structures/Embeds');
const Sender = require('../../../Modules/Utils/Sender');

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
        maintenance: false,
        premium: false,
        slowmode: null // time in miliseconds (10 min)
    },
    
    /**
     * @description The data of the help command.
     * @type {import('discord.js').ApplicationCommandData}
    */

    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('display command helper')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.SendMessages)
    .setDMPermission(true), 
    
    /**
     * @param { import('discord.js').Interaction } interaction 
     */

    async execute (interaction, language) {

        const { client, member } = interaction;

        const folders = [];
        const path = `${process.cwd()}/Interactions/SlashCommands`;

        const commandsFolder = fs.readdirSync(path);
        for(const folder of commandsFolder) {
            const testFolder = fs.statSync(`${path}/${folder}`); // test if it's an folder
            if(testFolder.isDirectory()) folders.push(folder);
        }

        const pageMin = 1;
        let page = 1,
            pageMax = folders.length;
        const rows = new ActionRowBuilder().addComponents(leftArrow, rightArrow, contactDev);

        await new Sender(interaction).CustomSend('', [await Page(page)], [rows], [], false)
        
        const filter = i => ['left-arrow', 'right-arrow'].includes(i.customId);
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60 * 1000 }); // 1 min

        collector.on('collect', async i => {
            if(i.user.id === member.id) {
                await i.deferUpdate();
                if(i.customId === 'left-arrow') {
                    if(page > pageMin) --page;
                } else {
                    if(page < pageMax) page++;
                }

                await new Sender(i).CustomEdit('', [await Page(page)], [rows], [], false)
            } else {
                await new Sender(i).Error(language.errors['reply_match']);
            }
        })

        async function Page(page) {
            const categorie = folders[page - 1];
            const embed = new Embed(client).Command()
                .setDescription(language.commands['help_desc']);

            const cmdLength = fs.readdirSync(`${path}/${categorie}`)
                .filter(file => file.endsWith('.js'))
                .map(cmd => {
                    const command = require(`${path}/${categorie}/${cmd}`);
                    embed.addFields(
                        { name: `\`${command.data.name}\``, value: `${command.data.description}`, inline: true }
                    )
                })

            if(cmdLength.length < 1) {
                embed
                    .setTitle(`🔕 Help - ${categorie}`)
                    .addFields({ name: '** **', value: language.errors['no_commands_available'] });
            } else embed.setTitle(`🧷 Help - ${categorie}`);

            return embed;
        }
    
    }, 
    
    /**
     * @param { import('discord.js').Interaction } interaction 
     */
    
    async autocomplete (interaction) {

    }
}