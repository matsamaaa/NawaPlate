const mongoose = require('mongoose');

const cooldownModel = new mongoose.Schema({
	memberId: String,
	guildId: String,
	date: Date,
	commandName: String
});

module.exports = mongoose.model('cooldown', cooldownModel, 'commandlogs');