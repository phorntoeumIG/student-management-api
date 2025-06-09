const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'student_management',
    port: 3307
});

connection.connect((err) => {
  if (err) throw err; 
  console.log('Connected to MySQL');
});

module.exports = connection;