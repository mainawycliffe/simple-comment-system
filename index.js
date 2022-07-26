const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/comment', (req, res) => {
  // save comment

  // redirect back to the homepage after saving comment
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Simple Comment System is listening on port ${port}`);
});
