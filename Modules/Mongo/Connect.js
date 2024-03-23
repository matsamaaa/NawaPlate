const mongoose = require('mongoose');
const { Process, Info, Error } = require('../Structures/Logs');

module.exports.connect = async () => {
    Process('connection in progress to the database');
    await mongoose.connect(process.env.MONGO_URL).then(() => {
        Info('connection to database successful');
    })
    .catch(() => {
        Error('connection to database refused');
    })
}