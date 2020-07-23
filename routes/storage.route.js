const router = require("express").Router();
const User = require("../models/user.model")
const Storage = require("../models/storage.model");
const isLoggedIn = require("../lib/blockCheck");
const methodOverride = require('method-override');
router.use(methodOverride('_method'))

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
  console.log (req.user);
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

router.delete("/delete/:id", (req, res) => {
  console.log(req.params.id);
  Storage.findByIdAndDelete(req.params.id)
  .then(()=>{
      res.redirect("/");
  })
  .catch((err)=>{
      console.log(err);
  });
})

// GET EDIT
router.get("/storage/edit/:id", (req, res) => {
  Storage.findById(req.params.id)
      .then((storage) => {
          res.render("storage/edit", {
              storage
          })
      })
      .catch(err => {
          console.log(err);
      })
})

// POST EDIT
router.post("/edit/:id", (req, res) => {
  console.log(req.body);
  Storage.findByIdAndUpdate(req.params.id, req.body)
      .then(() => {
          console.log("completed");
          res.redirect("/")
      })
      .catch(err => {
          console.log(err);
      })
})

module.exports = router;