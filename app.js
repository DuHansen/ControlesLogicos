const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const csurf = require('csurf');
const helmet = require('helmet');
const db = require('./database');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
app.use(csurf());
app.use(helmet());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) {
      return res.status(500).send("Error fetching tasks");
    }
    res.render('index', { tasks: rows, csrfToken: req.csrfToken() });
  });
});

app.post('/add', (req, res) => {
  const description = req.body.description;
  db.run("INSERT INTO tasks (description) VALUES (?)", [description], (err) => {
    if (err) {
      return res.status(500).send("Error adding task");
    }
    res.redirect('/');
  });
});

// Inicie o servidor na porta 3000
app.listen(3000, (err) => {
  if (err) {
    console.error('Error starting the server:', err);
  } else {
    console.log('Server is running on http://localhost:3000');
  }
});
