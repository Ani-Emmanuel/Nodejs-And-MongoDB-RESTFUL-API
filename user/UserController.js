const express = require("express");
const bodyparser = require("body-parser");

const router = express.Router();

router.use(bodyparser.urlencoded({ extended: true }));
router.use(bodyparser.json());

const User = require("./User");

//create a new user

router.post("/create", function(req, res) {
  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    },
    function(err, user) {
      if (err)
        return res.status(500).send("There was a problem creating the User");
      res.status(200).send(user);
    }
  );
});

//Reading all the User

router.get("/", function(req, res) {
  User.find({}, function(err, result) {
    if (err) res.status(500).send("There was an error getting the users");
    res.status(200).send(result);
  });
});

//Updating a particular User

router.put("/create/:id", function(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
    if (err) res.status(500).send("An Error occur while updating");
    res.status(200).send("Updated Successfully");
  });
});

//Deleting a particular user
router.delete("/create/:id", function(req, res) {
  User.findByIdAndDelete(req.params.id, function(err, result) {
    if (err) res.status(500).send("An Error occured while deleting User");
    res.send("User Deleted successfully");
  });
});
module.exports = router;
