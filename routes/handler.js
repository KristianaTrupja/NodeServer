const express = require("express");
const router = express.Router();
const Schema = require("../models/Schemas.js");

// Middleware to parse JSON body
router.use(express.json());

// Route to fetch tweets
router.get("/tweets", async (req, res) => {
  try {
    const tweets = await Schema.Tweets.find().populate("user");
    res.json(tweets); // Sending the data as JSON response
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching tweets");
  }
});

// Route to add tweets
router.post("/add-tweets", async (req, res) => {
  const { tweetInput } = req.body; // Destructure the tweet input from the request body
  try {
    const user = await Schema.Users.findOne({ username: "KristianaCoder" }).exec();
    if (!user) {
      return res.status(404).send("User not found");
    }

    const newTweet = new Schema.Tweets({
      tweet: tweetInput,
      user: user._id,
    });

    await newTweet.save(); // Use await to save the tweet
    res.status(201).send("Tweet created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving tweet");
  }
});

module.exports = router;
