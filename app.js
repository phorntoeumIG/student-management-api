const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');
const db = require('./views/db'); 
const user = require('./routes/userRoutes'); 

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));


app.get('/dashboard', (req, res) => {
  res.render('dashboard', { name: 'Admin' });
});


app.get('/', (req, res) => {
  res.render('login');
});

app.get('/user', function(req, res){
  res.send('user list');
});

app.use(express.json());
app.use(bodyParser.json());

app.use('/user',user); 

app.post('/submit_login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ? and password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Server error' });
    }

    if (results.length === 0) {
      return res.send('<script>alert("Invalid email or password"); window.location.href="/";</script>');
    }

    const user = { ...results[0] };
    delete user.password;

    return res.redirect('/dashboard');


  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
