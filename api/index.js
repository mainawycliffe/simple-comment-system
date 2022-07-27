import express from 'express';
import { engine } from 'express-handlebars';
import { DateTime } from 'luxon';
import bodyParser from 'body-parser';
// eslint-disable-next-line import/extensions
import { getComments, addComment, upvoteComment } from './src/data/comments.js';
import cors from 'cors';

const app = express();
const port = 3001;

// register handlebars, and the views directory
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(cors());
app.use(express.static('public'));

// parse application/json
app.use(bodyParser.json());

// this loads the html content for simple comment system
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/comments', (req, res) => {
  res.json({
    data: getComments(),
  });
});

app.post('/comments', (req, res) => {
  const { comment } = req.body;
  if (!comment) {
    res.status(400).end();
    return;
  }
  const commentObject = addComment(comment);
  res.status(200).json(commentObject).end();
});

app.post('/comments/:commentID/upvote', (req, res) => {
  const { commentID } = req.params;
  console.log(commentID);
  if (!commentID) {
    res.status(400).end();
    return;
  }
  const comment = upvoteComment(commentID);
  res.status(200).json(comment).end();
});

app.listen(port, () => {
  console.log(`Simple Comment System is listening on port ${port}`);
});
