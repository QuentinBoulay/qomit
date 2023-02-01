const express = require('express');
const app = express();
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

// Configurer body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// create the connection to database
const connection = mysql.createConnection({
  host: 'db',
  port: 3306,
  user: 'dbuser',
  password: 'dbpassword',
  database: 'dbname'
});

app.get('/', (req, res) => {
  res.send('Welcome to Qmklnxit')
})

//LOGIN
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT use_password FROM users WHERE use_email = ?';

  connection.query(query, [email], (error, results) => {
    if (error) {
      res.send('Une erreur s\'est produite lors de la récupération des données.');
    } else if (results.length === 0) {
      res.send('Identifiant ou mot de passe incorrect.');
    } else {
      const hashedPassword = results[0].use_password;
      bcrypt.compare(password, hashedPassword, (error, result) => {
        if (error) {
          res.send('Une erreur s\'est produite lors de la vérification du mot de passe.');
        } else if (result) {
          res.send('Identifiant et mot de passe corrects.');
        } else {
          res.send('Identifiant ou mot de passe incorrect.');
        }
      });
    }
  });
});


//USERS
//get all users
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (error, results) => {
    res.json(results);
  });
});

//get 1 user
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM users WHERE use_id = ?', [id], (error, results) => {
    res.json(results[0]);
  });
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})






// simple query
connection.query(
  'SELECT * FROM `table_name`',
  (err, results, fields) => {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);
