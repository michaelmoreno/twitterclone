const express = require("express");
const users = express.Router();
const mongoose = require("mongoose");

const User = require("../models/users.jsx");
// const { create } = require("../models/users.jsx");

User.init();

// index
users.get("/", (req, res) => {
  User.find({}, (err, foundUsers) => {
    if (err) {
      console.log(err.message);
    } else {
      res.status(200).json(foundUsers);
    }
  });
});

// create
users.post("/create", (req, res) => {
  User.create(req.body, (error, createdUser) => {
    if (error) {
      console.log(error.message);
    } else {
      res.status(200).send(createdUser);
    }
  });
});

// update
users.put("/:id", (req, res) => {
  console.log("server put", req.params.id);
  console.log("body", req.body);
  User.findOneAndUpdate(
    { _id: req.params.id },
    { title: req.body.title, url: req.body.url },
    { new: true },
    (error, updatedUser) => {
      if (error) {
        console.log(error.message);
      } else {
        console.log(updatedUser);
        res.status(200).json(updatedUser);
      }
    }
  );
});

// delete
users.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, (error, deletedUser) => {
    if (error) {
      console.log(error.message);
    } else {
      res.status(200).json(deletedUser);
    }
  });
});

module.exports = users;
