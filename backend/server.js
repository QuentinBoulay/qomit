const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Welcome to Qomit')
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})


const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'yourdatabasename'
});

// simple query
connection.query(
  'SELECT * FROM `table_name`',
  (err, results, fields) => {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);
