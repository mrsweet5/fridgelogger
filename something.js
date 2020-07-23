const mongoose = require("mongoose");
require("dotenv").config();
const Storage = require('./models/storage.model');
const User = require('./models/user.model');
// seed into mongodb
mongoose.Promise = Promise;
mongoose
  .connect(process.env.MONGODBLIVE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("mongodb is running!");
  })
  .catch((e) => {
    console.log(e);
  });
Storage.deleteMany({})
  .then(() => {
    User.deleteMany({})
      .then(() => {
        mongoose.disconnect(() => console.log("end"));
      })
  })
  .catch(err => console.log(err));