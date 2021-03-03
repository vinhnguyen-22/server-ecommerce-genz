const mongoose = require("mongoose");

//anchor environment variable
require("dotenv").config();

async function connect() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.futys.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.log("DB connected");
  } catch (error) {
    console.log("DB disconnect");
  }
}

module.exports = { connect };
