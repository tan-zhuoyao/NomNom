import express from 'express';
import * as pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg.default;
const dbConfig = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
};
const db = new Pool(dbConfig);

// testing connection
db.query('SELECT * FROM reviews', (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log(res.rows);
  }
});


const app = express();

app.get('/', (req, res) => {
  res.send('Hello from nomnom-service!');
});

// just for testing now
const data = {"1": "bob", "2": "alice"};

// get nomnom posts filtered by userId
app.get('/data/:userId', (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    res.status(400).send();
  }
  res.send(data);
});


const port = process.env.PORT || 3000;
console.log("Server listening on: " + port);
app.listen(port);
