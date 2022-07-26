import express from 'express';
import { engine } from 'express-handlebars';
import { DateTime } from 'luxon';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// this will act as a very simplistic in memory db, not a huge fan of global
// variables though
const comments = [
  {
    name: 'John Doe',
    photo: 'https://i.pravatar.cc/150?u=johndoe@example.com',
    postedAt: DateTime.now().minus({ minute: 45 }).toISO(),
    comment: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.`,
    upvotes: 15,
  },
  {
    name: 'Jane Doe',
    photo: 'https://i.pravatar.cc/150?u=janedoe@example.com',
    postedAt: DateTime.now().minus({ minute: 13 }).toISO(),
    comment: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
    upvotes: 17,
  },
  {
    name: 'Maina Wycliffe',
    photo: 'https://i.pravatar.cc/150?u=mainawycliffe@example.com',
    postedAt: DateTime.now().minus({ minute: 5 }).toISO(),
    comment: `Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    upvotes: 5,
  },
];

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
    data: comments,
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
  comments.push(commentObj);
  res.status(200).json(commentObj).end();
});

app.listen(port, () => {
  console.log(`Simple Comment System is listening on port ${port}`);
});
