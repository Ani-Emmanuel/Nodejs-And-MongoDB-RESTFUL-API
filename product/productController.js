const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");

//Passing the body Parser instance to the router Instance
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({ extended: true }));

//Calling the Product class("The Product Schema")
const Product = require("./Product");

//Performing The Http verb operation (POST,GET,DELETE,UPDATE)

//Getting all the Product from the Table
router.all("/product", (req, res) => {
  Product.find({}, (err, result) => {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
});

//Getting a particular record from the Product table
router.get("/product/:id", (req, res) => {
  Product.findById(req.params.id, (err, result) => {
    if (err) res.status(500).send(err);
    if (result === null) res.status(404).send("File Not Found");
    res.status(200).send(result);
  });
});

//Creating a new Product
router.post("/product/create", (req, res) => {
  Product.create(
    {
      name: req.body.name,
      brand: req.body.brand,
      description: req.body.description
    },
    (err, result) => {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    }
  );
});

//Updating a particular record in the Product table
router.put("/product/update/:id", (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
});

//Deleting a particular record in the Product table
router.delete("/product/delete/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
});

module.exports = router;
