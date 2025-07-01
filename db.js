// db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // replace with your MySQL username
  password: 'abi2102',         // replace with your MySQL password
  database: 'studentdata' // the database you created earlier
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err);
    return;
  }
  console.log('MySQL connected!');
});

module.exports = db;
