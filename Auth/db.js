const mongoose = require("mongoose");
require("dotenv").config()


const URL = process.env.mongoURL;
const connection = mongoose.connect(URL)



module.exports = {
    connection
}