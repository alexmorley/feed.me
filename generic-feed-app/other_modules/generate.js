"use strict";
const fs = require("fs");

function Feed() {
  let posts = [];

  function add_random(usernames, post_text, post_media) {
    posts.push(create_random(usernames, post_text, post_media));
  }

  function populate(n = 20) {
    for (let i = 0; i < n; i++) {
      feed.add_random();
    }
  }

  function create_random(usernames, post_text, post_media) {
    if (!usernames) {
      usernames = RandArray([
        "alexmorley",
        "cassiecardiff",
        "thomasin",
        "willow"
      ]);
      post_text = RandArray([
        "hey look at this!",
        "lol",
        "wtf!?!?",
        "loving this weather",
        "soooooo hungry RN"
      ]);
      post_media = RandArray(["cat_pic.png", "cat_video.mp4"]);
    }

    let obj = {
      username: usernames.rand,
      text: post_text.rand,
      media: post_media.rand
    };
    return obj;
  }

  return {
    add_random,
    populate,
    posts
  };
}

function rand_index(array) {
  let length = array.length;
  let index = Math.round(Math.random() * (length - 1));
  return index;
}

function RandArray(array) {
  let r_a = Object.create(array);
  Object.defineProperty(r_a, "rand", {
    get: function() {
      return r_a[rand_index(r_a)];
    },
    enumerable: false
  });
  return r_a;
}

module.exports = Feed;
