const mongoose = require('mongoose');

mongoose.set({strictQuery:false})
const connectDB = (URL) => {
    mongoose.connect(URL);
    console.log(`successfuly connected ✅`);
}

module.exports = connectDB;