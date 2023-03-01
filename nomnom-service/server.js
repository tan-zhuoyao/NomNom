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

// just for testing connection
// db.query('SELECT * FROM reviews', (err, res) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(res.rows);
//   }
// });

const filterByUserId = async (userId) => {
  const getReviews = `SELECT * FROM reviews LEFT JOIN pictures p on reviews.post_id = p.post_id WHERE user_id='${userId}'`;
  const res = await db.query(getReviews);
  return res.rows;
}

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from nomnom-service!');
});


// get nomnom posts filtered by userId
app.get('/data/:userId', (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    res.status(400).send();
  }
  filterByUserId(userId).then(response => {
    res.send(response);
  });
});


const port = process.env.PORT || 3000;
console.log("Server listening on: " + port);
app.listen(port);
