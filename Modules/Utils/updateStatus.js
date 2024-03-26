const { ActivityType, Client } = require('discord.js');
const { ACTIVITIES, MAINTENANCE } = require("../../Configs/Datas");

/**
 * @param { Client } client 
 */

module.exports.update = async (client) => {
    let i = 0;
    setInterval(async function() {
        if(!ACTIVITIES[i]) i = 0;
        else if(MAINTENANCE) {
            client.user.setActivity('🚧 MAINTENANCE', { type: ActivityType.Playing });
            client.user.setStatus('dnd');
        }
        else {
            let activitie = ACTIVITIES[i].toString();

            if(activitie === 'SERVERSCOUNT') {
                const guildsSize = await client.cluster.broadcastEval(`this.guilds.cache.size`);
                let totalGuilds = 0;
                guildsSize.map((res) => totalGuilds += res);
                activitie = `${totalGuilds} Guilds !`
            } else if(activitie === 'MEMBERSCOUNT'){
                const membersSize = await client.cluster.broadcastEval((c, context) => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0));
                let totalMembers = 0;
                membersSize.map((res) => totalMembers += res);
                activitie = `${totalMembers} Users !`
            }

            client.user.setActivity(activitie, { type: ActivityType.Playing });
            client.user.setStatus('online');
            i++
        }
    }, 10 * 1000)
}