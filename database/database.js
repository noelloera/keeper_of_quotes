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
  useFindAndModify: false,
};

//Modular database connection functions
async function connect() {
  await mongoose
    .connect(dbUrl, options)
    .then(() => {
      console.log("... successfully connected Database");
    })
    .catch((error) => {
      console.log(error);
    });
}

async function disconnect() {
  await mongoose
    .disconnect()
    .then(() => {
      console.log("... successfully disconnected Database")
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  mongoose,
  dbUrl,
  options,
  connect,
  disconnect,
};
