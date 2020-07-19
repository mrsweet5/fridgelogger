const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const server = express();
const passport = require("./lib/passportConfig");
const session = require("express-session");
const flash = require("connect-flash");
const checkUser = require("./lib/blockCheck");
require("dotenv").config();

mongoose.connect(
    process.env.MONGODBURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    () => {
      console.log("MongoDB connected!");
    }
  );

server.use(express.static("public")); //look for static files in public folder
server.use(express.urlencoded({ extended: true })); //collects form data
server.set("view engine", "ejs"); //view engine setup
server.use(expressLayouts); //Express EJS layout to make views into block

server.use(
    session({
      secret: process.env.SECRET,
      saveUninitialized: true,
      resave: false,
      cookie: { maxAge: 360000 },
    })
);

server.use(passport.initialize());
server.use(passport.session());
server.use(flash());
  //set global variable for ejs files
  //third param is mostly called next (moveOn)
server.use(function (req, res, moveOn) {
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    moveOn();
});
  //all routes
server.use("/auth", require("./routes/auth.route"));
server.use("/", require("./routes/storage.route"));

 server.listen(process.env.PORT, () => {
    console.log(`running on PORT ${process.env.PORT}`);
  });