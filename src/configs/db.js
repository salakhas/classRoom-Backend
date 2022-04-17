require('dotenv').config();
const password = process.env.PASSWORD;

const mongoose = require('mongoose');

const connect = () => {
    return mongoose.connect(
        `mongodb+srv://fullstackEval:${password}@cluster0.gplc8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    );
};

module.exports = connect;