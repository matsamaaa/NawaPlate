const { CHANNELS } = require('../../Configs/Datas');
const Sender = require('../../Modules/Utils/Sender');

module.exports = {
    options: {
        maintenance: false,
        premium: false
    },
    id: 'report',
    
    /**
     * @param { import("discord.js").Interaction } interaction 
     * @param { * } language 
     */
    
    async execute (interaction, language) {

        const { client, fields } = interaction;
        const reportText = fields.getTextInputValue('report');

        await new Sender(interaction).InfoEdit(language.modals['report_success'])

        return await new Sender(interaction).CustomChannelSend(CHANNELS.report.channel, reportText, [], [], []);

    }
}