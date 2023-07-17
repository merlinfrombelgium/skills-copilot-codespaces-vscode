// Create web server
const express = require('express');
const app = express();

// parse incoming requests with JSON payloads
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// allow CORS
const cors = require('cors');
app.use(cors());

// setup database connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });

// setup schema
const commentSchema = new mongoose.Schema({
  name: String,
  comment: String,
  timestamp: String
});

// setup model
const Comment = mongoose.model('Comment', commentSchema);

// setup routes
app.get('/comments', (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      console.log(err);
    } else {
      res.json(comments);
    }
  });
});

app.post('/comments', (req, res) => {
  const comment = new Comment({
    name: req.body.name,
    comment: req.body.comment,
    timestamp: req.body.timestamp
  });

  comment.save((err, comment) => {
    if (err) {
      console.log(err);
    } else {
      res.json(comment);
    }
  });
});

// start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});