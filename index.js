require('dotenv').config({ path: './Configs/.env' });

const { ClusterManager, HeartbeatManager } = require('discord-hybrid-sharding');
const { Process } = require('./Modules/Structures/Logs');
const Mongo = require('./Modules/Mongo/Connect');
const Check = require('./Modules/Utils/DataCheck');
const chalk = require('chalk');
const { TOKEN_DISCORD } = process.env;

(async () => {

    // Check all datas
    const dataStatus = await Check.checkAllData();
    if(!dataStatus) return;

    // Database connetion
    const mongoStatus = await Mongo.connect();
    if(!mongoStatus) return;

    // Maintenance Status
    await Check.checkMaintenance();

    // Cluster creation
    const manager = new ClusterManager(`${__dirname}/Modules/Client.js`, {
        totalShards: 'auto',
        shardsPerClusters: 5,
        totalClusters: 'auto',
        mode: 'process',
        token: TOKEN_DISCORD,
        respawn: true,
    });

    manager.extend(
        new HeartbeatManager({
            interval: 4000,
            maxMissedHeartbeats: 3,
        })
    )

    manager.on('clusterCreate', cluster => Process(`Launched Cluster ${chalk.bold.blueBright(cluster.id)}`));
    manager.spawn({ timeout: -1 });

})();