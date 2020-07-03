const mongoose = require("mongoose");

const dbUrl = "mongodb://localhost:27017/myapp"
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
async function connect(){
    await mongoose.connect(dbUrl, options)
    await mongoose.connect.db.dropDatabase(); 

}


async function disconnect(){
    await mongoose.disconnect();
}

module.exports = {
    mongoose,
    dbUrl,
    options,
    connect,
    disconnect,
  };
  