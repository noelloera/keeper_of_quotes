const mongoose = require("mongoose");

//DatabaseURL as well as secrets being stored in environment variables
const dbUrl =
  "mongodb+srv://" +
  process.env.MONGO_E +
  ":" +
  process.env.MONGO_P +
  "@quotekeeper.ggozb.mongodb.net/quotekeeper?retryWrites=true&w=majority";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

//Modular database connection functions 
async function connect() {
  await mongoose
    .connect(dbUrl, options)
    .then(() => {
      console.log("... successfuly connected to Database");
    })
    .catch((err) => {
      console.log(err);
    });
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
