const mongoose = require('mongoose');
const { Process, Info, Error } = require('../Structures/Logs');

const { URL_MONGO_INTERNAL, URL_MONGO_EXTERNAL } = process.env;

module.exports.connect = async () => {
    let isRunning = true;
    Process('connection in progress to the database');
    await mongoose.connect(URL_MONGO_INTERNAL).then(() => {
        Info('connection to database successful');
    })
    .catch(async () => {
        await mongoose.connect(URL_MONGO_EXTERNAL).then(() => {
            Info('connection to database successful');
        })
        .catch(() => {
            isRunning = false;
            Error('connection to database refused');
        })
    })

    return isRunning;
}