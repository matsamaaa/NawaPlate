require('dotenv').config({ path: './Configs/.env' });

const { ClusterManager, HeartbeatManager, ReClusterManager } = require('discord-hybrid-sharding');
const { Process, Error } = require('./Modules/Structures/Logs');
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

        respawn: true,
        restarts: {
            max: "Infinity",
            interval: 60000 * 60,
        },
        spawnOptions: {
            timeout: 30000,
        },

        token: TOKEN_DISCORD,
    });

    manager.on('clusterCreate', cluster => {
        Process(`launched Cluster ${chalk.bold.blueBright(cluster.id)}`);

        // edit

        cluster.on("death", (cc, t) => {
            Error(`cluster ${chalk.bold.redBright(cluster.id)} died`)
    
            console.log(`ID: ${cc.id}`);
            console.log(`Exit Code: ${t.exitCode}`);
            console.log(`Killed: ${t.killed}`);
            console.log(`Args: ${t.spawnargs}`);
        });
    
        cluster.on("error", (e) => {
            Error(`cluster ${chalk.bold.redBright(cluster.id)} has an error`)
    
            console.log(e.name);
            console.log(e.message);
            console.log(e.stack);
        });
    });

    manager.extend(
        new HeartbeatManager({ interval: 5000, maxMissedHeartbeats: 10 }),
        new ReClusterManager({ restartMode: "rolling" })
    );

    manager.spawn({ timeout: -1 })
        .catch((e) => {
            Error('manager spawn error')
        });

})();