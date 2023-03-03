import express from 'express';
import * as pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg.default;
// For localhost
const localDbConfig = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
};

// For AWS
const awsDbConfig = {
  host: process.env.AWS_HOST,
  database: process.env.AWS_NAME,
  port: process.env.AWS_PORT,
  user: process.env.AWS_USER,
  password: process.env.AWS_PW
};

const db = (process.env.ENV === 'localhost') ? new Pool(localDbConfig) : new Pool(awsDbConfig);

// just for testing connection
// db.query('SELECT * FROM reviews', (err, res) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(res.rows);
//   }
// });

const filterByUserId = async (userId) => {
  const sqlQuery = `SELECT * FROM reviews WHERE user_id='${userId}'`;
  const res = await db.query(sqlQuery);
  return res.rows;
}

const addReview = async (userId, restaurant, review) => {
  const sqlQuery = `INSERT INTO reviews(user_id, restaurant, review) VALUES ('${userId}', '${restaurant}', '${review}')`;
  const res = await db.query(sqlQuery);
  return res.rows;
}

const addReviewWithPictures = async (userId, restaurant, review, url) => {
  const sqlQuery = `INSERT INTO reviews(user_id, restaurant, review, url) VALUES ('${userId}', '${restaurant}', '${review}', ARRAY['${url.join("','")}'])`;
  const res = await db.query(sqlQuery);
  return res.rows;
}

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from nomnom-service!');
});

// get nomnom posts filtered by userId
app.get('/data/:userId', (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    res.status(400).send("invalid parameters");
  }
  filterByUserId(userId).then(response => {
    res.send(response);
  });
});

// update review table on a new posting
app.post('/post', (req, res) => {
  const { userId, restaurant, review, url } = req.body;
  if (!userId || !restaurant || !review) {
    res.status(400).send("invalid parameters");
  } else {
    if (url) {
      addReviewWithPictures(userId, restaurant, review, url).then(response => {
        res.send("posted successfully");
      });
    } else {
      addReview(userId, restaurant, review).then(response => {
        res.send("posted successfully");
      });
    }
  }
});


const port = process.env.PORT || 3000;
console.log("Server listening on: " + port);
app.listen(port);
