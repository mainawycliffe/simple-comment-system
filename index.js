import express from 'express';
import { engine } from 'express-handlebars';
import { DateTime } from 'luxon';
import bodyParser from 'body-parser';
import { getComments, initialComments, addComment } from './src/data/comments.js';

const app = express();
const port = 3000;

// register handlebars, and the views directory
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

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
  const comment = req.body.comment;
  if (!comment) {
    res.status(400).end();
    return;
  }
  const commentObj = {
    name: 'John Doe',
    photo: 'https://i.pravatar.cc/150?u=johndoe@example.com',
    postedAt: DateTime.now().toISO(),
    comment: comment,
    upvotes: 1,
  };
  addComment(commentObj);
  res.status(200).json(commentObj).end();
});

app.listen(port, () => {
  console.log(`Simple Comment System is listening on port ${port}`);
});
