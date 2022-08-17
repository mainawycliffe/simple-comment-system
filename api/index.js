import express from 'express';
import { DateTime } from 'luxon';
import bodyParser from 'body-parser';
// eslint-disable-next-line import/extensions
import { getComments, addComment, upvoteComment } from './src/data/comments.js';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());

// parse application/json
app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  res.json({
    data: getComments(),
  });
});

app.post('/comments', (req, res) => {
  const { comment, replyForID } = req.body;
  if (!comment) {
    res.status(400).end();
    return;
  }
  const commentObject = addComment(comment, replyForID);
  res.status(200).json(commentObject).end();
});

app.post('/comments/:commentID/upvote', (req, res) => {
  const { commentID } = req.params;
  if (!commentID) {
    res.status(400).end();
    return;
  }
  const comment = upvoteComment(commentID);
  if (!comment) {
    res.status(404).end();
    return;
  }
  res.status(200).json(comment).end();
});

app.listen(port, () => {
  console.log(`Simple Comment System is listening on port ${port}`);
});
