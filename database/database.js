const mongoose = require("mongoose");

const dbUrl = "mongodb+srv://" + process.env.MONGO_E + ":" + process.env.MONGO_P + "@quotekeeper.ggozb.mongodb.net/<dbname>?retryWrites=true&w=majority";
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
async function connect() {
    await mongoose.connect(dbUrl, options)
}


async function disconnect() {
    await mongoose.connect.db.dropDatabase();
    await mongoose.disconnect();
}

module.exports = {
    mongoose,
    dbUrl,
    options,
    connect,
    disconnect,
};
