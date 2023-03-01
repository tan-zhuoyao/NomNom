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
  const getReviews = `SELECT reviews.post_id, user_id, restaurant, review, url FROM reviews LEFT JOIN pictures p on reviews.post_id = p.post_id WHERE user_id='${userId}'`;
  const res = await db.query(getReviews);
  return res.rows;
}

const combine = (res) => {
  let out = {};
  for (let i = 0; i < res.length; i++) {
    const data = res[i];
    const {post_id, user_id, restaurant, review, url } = data;
    if (!out[post_id]) {
      out[data.post_id] = {
        user_id,
        restaurant,
        review,
        url: url ? [url] : null
      }
    } else {
      out[post_id].url.push(data.url);
    }
  }
  return out;
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
    const processedRes = combine(response);
    res.send(processedRes);
  });
});


const port = process.env.PORT || 3000;
console.log("Server listening on: " + port);
app.listen(port);
