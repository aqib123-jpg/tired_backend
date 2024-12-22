const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});
db.connect(err => {
  if (err) {
      console.error('Error connecting to MySQL:', err.message);
      process.exit(1); // Exit if connection fails
  }
  console.log('Connected to MySQL database');
});

db.query(
  `CREATE TABLE IF NOT EXISTS USERDATA (
    id INT AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(255),
    NUMBER VARCHAR(15),
    AGE INT
  )`,
  (err) => {
    if (err) throw err;
    console.log('USERDATA table ready');
  }
);

app.post('/api/add-user', (req, res) => {
  res.send('Adding User is Correct');
  // console.log("inside it ");
  // const { name, number, age } = req.body;
  // const query = 'INSERT INTO USERDATA (NAME, NUMBER, AGE) VALUES (?, ?, ?)';
  // db.query(query, [name, number, age], (err) => {
  //   if (err) throw err;
  //   res.status(201).json({ message: 'User added successfully' });
  // });
});

app.get('/api/users', (req, res) => {
  res.send('Getting User is Correct');
  // console.log("inside the request");
  // const query = 'SELECT * FROM USERDATA';
  // db.query(query, (err, results) => {
  //   if (err) throw err;
  //   res.json(results);
  // });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
