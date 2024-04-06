require('dotenv').config({ path: './Configs/.env' });

const { ClusterManager, HeartbeatManager, ReClusterManager } = require('discord-hybrid-sharding');
const { Process, Error } = require('./Modules/Structures/Logs');
const Mongo = require('./Modules/Mongo/Connect');
const Check = require('./Modules/Utils/DataChecker');
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
    
            Error(`ID: ${cc.id}`);
            Error(`Exit Code: ${t.exitCode}`);
            Error(`Killed: ${t.killed}`);
            Error(`Args: ${t.spawnargs}`);
        });
    
        cluster.on("error", (e) => {
            Error(`cluster ${chalk.bold.redBright(cluster.id)} has an error`)
    
            Error(e.name);
            Error(e.message);
            Error(e.stack);
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

    // edit

    process.on('uncaughtException', (err, origin) => {
        fs.writeSync(
            process.stderr.fd,
            `Caught exception: ${err}\n` +
            `Exception origin: ${origin}\n`,
        );
    });


    process.on("unhandledRejection", async (reason, promise) => {

    });
})();