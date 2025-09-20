const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () => {
  mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected successfully"))
    .catch((error) => {
      console.error("Error in connecting to the database:", error);
    });
};
