import express from 'express';
import * as pg from 'pg';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import AWS from 'aws-sdk';
import cors from 'cors';

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
  const sqlQuery = `INSERT INTO reviews(user_id, restaurant, review, url) VALUES ('${userId}', '${restaurant}', '${review}', '${url}')`;
  const res = await db.query(sqlQuery);
  return res.rows;
}

const editReview = async (postId, updatedReview) => {
  const sqlQuery = `UPDATE reviews SET review = '${updatedReview}' WHERE post_id = ${postId}`;
  const res = await db.query(sqlQuery);
  return res.rows;
}

const deleteReview = async (postId) => {
  const sqlQuery = `DELETE FROM reviews WHERE post_id = ${postId}`;
  const res = await db.query(sqlQuery);
  console.log(res);
  return res.rows;
}

const uploadToS3Bucket = async (fileName, selectedFile, fileType) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });

  const stored = await s3.upload({
    Bucket: 'nomnom-store',
    Key: fileName,
    Body: selectedFile,
    ContentType: fileType,
    ACL: 'public-read'
  }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  }).promise();
  return stored;
};

const app = express();
app.use(express.json());
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

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

// key - takes in the file name
app.post('/upload/:key', bodyParser.raw({ type: ['image/jpeg', 'image/png'], limit: '5mb' }),
  (req, res) => { 
    const { key } = req.params;
    const type = req.headers['content-type'];
    const body = req.body;
    uploadToS3Bucket(key, body, type).then(stored => {
      const url = stored.Location;
      if (!url) {
        res.status(400).send("bad request");
      } else {
        res.status(200).send(url);
      }
    });
  });

  app.post('/edit', (req, res) => {
    const { postId, updatedReview } = req.body;
    editReview(postId, updatedReview).then(response => {
      res.status(200).send();
    })
  })

  app.post('/delete', (req, res) => {
    const { postId }= req.body;
    deleteReview(postId).then(response => {
      res.status(200).send();
    })
  })


const port = process.env.PORT || 3000;
console.log("Server listening on: " + port);
app.listen(port);
