const router = require("express").Router();
const Storage = require("../models/storage.model");

router.get("/", async (req, res) => {
    try {
      res.render("storage/index");
    } catch(err) {
      console.log(err);
    }
});

router.get("/create", (req, res) => {
    res.render("storage/create");
  });

router.post("/create", (req, res) => {
    console.log (req.body);
    let storageData = {
      location: req.body.location,
      name: req.body.name,
      quantity: req.body.quantity,
      expiry: req.body.expiry,
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