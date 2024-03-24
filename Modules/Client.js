const { Client, GatewayIntentBits, Options } = require('discord.js');
const { ClusterClient, getInfo } = require('discord-hybrid-sharding');
const Events = require('./Utils/RegisterEvents');

const client = new Client({
    shards: getInfo().SHARD_LIST, // An array of shards that will get spawned
    shardCount: getInfo().TOTAL_SHARDS, // Total number of shards

    // Data Cache
	makeCache: Options.cacheWithLimits({
		...Options.DefaultMakeCacheSettings,
		ReactionManager: 0,
		GuildMemberManager: {
			maxSize: 200,
			keepOverLimit: member => member.id === client.user.id,
		},
	}),

	// Data Sweeper
	sweepers: {
		...Options.DefaultSweeperSettings,
		messages: {
			interval: 1800, // Every hour...
			lifetime: 1800,	// Remove messages older than 30 minutes.
		},
		users: {
			interval: 1800, // Every hour...
			filter: () => user => user.bot && user.id !== client.user.id, // Remove all bots.
		},
	},

	intents: [
		GatewayIntentBits.AutoModerationConfiguration,
		GatewayIntentBits.AutoModerationExecution,
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.DirectMessageTyping,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildScheduledEvents,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildWebhooks,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent
	],
});

client.cluster = new ClusterClient(client); // initialize the Client, so we access the .broadcastEval()

(async () => {

	// ================= Register =================

	await Events.registerEvents(client);

	// ================= Loading =================

})();

