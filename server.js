// see a list of pre-populated movies
// add a movie to the list
// update movie information
// remove a movie
// see only released movies

const express = require('express');
const Posts = require('./data/db.js');
const server = express();

server.use(express.json()); // teaches express to parse JSON body

// sanity check endpoint
server.get('/', (req, res) => {
  res.status(200).json({ api: 'is up up and away' });
});

// see a list of posts
server.get('/api/posts', (req, res) => {
  // Posts.find() returns a promise, we need the bros(.then, .catch)
  Posts.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' });
    });
});

// get a specific post
server.get('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  Posts.findById(postId)
    .then(post => {
      if (!post) {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: 'The post information could not be retrieved.' });
    });
});
module.exports = server; // CommonJS modules (node)
