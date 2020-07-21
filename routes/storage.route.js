const router = require("express").Router();
const User = require("../models/user.model")
const Storage = require("../models/storage.model");
const isLoggedIn = require("../lib/blockCheck");

router.get("/", isLoggedIn, async (req, res) => {
  try {
    // Storage.findById(req.user.id, "storage")
    // .populate("storage")
    // .then((user) => {
    //   let storages = user.storage;
    //   res.render("storage/index");
    // });
    let storage = await Storage.find()
    // let user = await User.find()
    res.render("storage/index", { storage });
  } catch(err) {
    console.log(err);
  }
});

router.get("/location/:anything", async (req, res) => {
  try {
    let storage = await Storage.find({ location : req.params.anything });
    res.render("storage/index", { storage });
  } catch(err) {
    console.log(err);
  }
});

router.get("/show/:location", isLoggedIn, (req, res) => {
  res.render("storage/index");
});

router.get("/create", isLoggedIn, (req, res) => {
  res.render("storage/create");
});

router.post("/create", (req, res) => {
  console.log (req.body);
  let storageData = {
    location: req.body.location,
    name: req.body.name,
    quantity: req.body.quantity,
    expiry: req.body.expiry,
    createdBy: req.user._id,
  };

  let storage = new Storage(storageData);

  storage.save()
  .then(() => {
    res.redirect("/");
  })
  .catch((err) => {
    console.log(err);
  });
});

module.exports = router;