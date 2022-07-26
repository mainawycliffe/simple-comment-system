import { engine } from 'express-handlebars';
import { DateTime } from 'luxon';
const app = express();
const port = 3000;


// register handlebars, and the views directory
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// this loads the html content for simple comment system
app.get('/', (req, res) => {
  res.render('index');
});

});

app.post('/comment', (req, res) => {
  // save comment

  // redirect back to the homepage after saving comment
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Simple Comment System is listening on port ${port}`);
});
