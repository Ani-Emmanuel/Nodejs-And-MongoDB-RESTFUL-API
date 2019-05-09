const express = require("express");
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.use(bodyparser.urlencoded({ extended: true }));
router.use(bodyparser.json());

const config = require("../config");
const User = require("./User");

//create a new user

router.post("/create", function(req, res) {
  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    },
    (err, result) => {
      if (err)
        res.status(500).send("There was a problem registering the user.");

      //For the token configuration and setting
      const token = jwt.sign({ id: User._id }, config.secret, {
        expiresIn: 86400
      });
      res.status(200).send({ auth: true, token: token });
    }
  );
});

router.get("/me", (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token)
    res.status(401).send({ auth: false, message: "No token provided" });

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate Token" });
    res.status(200).send(decoded);
  });
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
