const express = require("express");
const tweets = express.Router();
const mongoose = require("mongoose");

const Tweet = require("../models/tweets.jsx");
const { create } = require("../models/tweets.jsx");

// index
tweets.get("/", (req, res) => {
  tweet.find({}, (err, foundTweets) => {
    if (err) {
      console.log(err.message);
    } else {
      res.status(200).json(foundTweets);
    }
  });
});

// create
tweets.post("/", (req, res) => {
  Tweet.create(req.body, (error, createdTweet) => {
    if (error) {
      console.log(error.message);
    } else {
      res.status(200).send(createdTweet);
    }
  });
});

// update
tweets.put("/:id", (req, res) => {
  console.log("server put", req.params.id);
  console.log("body", req.body);
  Tweet.findOneAndUpdate(
    { _id: req.params.id },
    { title: req.body.title, url: req.body.url },
    { new: true },
    (error, updatedTweet) => {
      if (error) {
        console.log(error.message);
      } else {
        console.log(updatedTweet);
        res.status(200).json(updatedTweet);
      }
    }
  );
});

// delete
tweets.delete("/:id", (req, res) => {
  Tweet.findByIdAndRemove(req.params.id, (error, deletedTweet) => {
    if (error) {
      console.log(error.message);
    } else {
      res.status(200).json(deletedTweet);
    }
  });
});

module.exports = tweets;
