var express = require("express");
var router = express.Router();
var Feed = require("../other_modules/generate.js");
var hbs_helpers = require("../other_modules/hbs_helpers.js");

// Initialize Feed
feed = Feed();
feed.populate();

console.log(feed.posts);

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", {
    title: "M-Social",
    posts: feed.posts,
    helpers: { ifObject: hbs_helpers.ifObject }
  });
});

module.exports = router;
