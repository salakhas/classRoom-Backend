require('dotenv').config();
const link = process.env.LINK;

const mongoose = require('mongoose');

const connect = () => {
    return mongoose.connect(`${link}`);
};

module.exports = connect;