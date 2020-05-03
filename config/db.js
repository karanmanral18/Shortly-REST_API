const mongoose = require("mongoose");
const config = require("config");

// const db = config.get("mongoURI");
const db = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-nrcnx.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
    console.log("MOngoDB connected");
  } catch (err) {
    console.log(err.messsage);
    process.exit(1);
  }
};

module.exports = connectDB;
