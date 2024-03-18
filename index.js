require('dotenv/config');

const { ClusterManager, HeartbeatManager } = require('discord-hybrid-sharding');
const { Process } = require('./Modules/Structures/Logs');

// Cluster creation
const manager = new ClusterManager(`${__dirname}/client.js`, {
    totalShards: 'auto',
    shardsPerClusters: 5,
    totalClusters: 'auto',
    mode: 'process',
    token: process.env.TOKEN,
    respawn: true,
});

manager.extend(
    new HeartbeatManager({
        interval: 4000,
        maxMissedHeartbeats: 3,
    })
)

manager.on('clusterCreate', cluster => Process(`Launched Cluster ${cluster.id}`));
manager.spawn({ timeout: -1 });