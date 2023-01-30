const express = require('express');
const app = express();
const mysql = require('mysql2');

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
