const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const passport = require("../lib/passportConfig");
const saltRounds = 10;

router.get("/register", (req, res) => {
    res.render("auth/new");
});

router.post("/register", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    let hashedPassword = await bcrypt.hash(password, saltRounds);
    let user = new User({
      name,
      email,
      password: hashedPassword,
    });

    let savedUser = await user.save();
    if (savedUser) {
        req.flash("Account created");
        res.redirect("/auth/login");
      }
    } catch (error) {
        console.log(error);
      }
});

router.get("/login", (req, res) => {
        res.render("auth/login");
});

router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/auth/login",
      failureFlash: "Invalid Email/Password, Please enter correct details",
    })
);

router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Oh no!!! dont leave me!!!");
    res.redirect("/auth/login");
});
  
module.exports = router;