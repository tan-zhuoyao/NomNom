import express from 'express';
import * as pg from 'pg';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
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

const getAllReviews = async () => {
  const sqlQuery = `SELECT * FROM reviews ORDER BY time DESC LIMIT 20;`;
  const res = await db.query(sqlQuery);
  return res.rows;
}

const filterByUserId = async (userId) => {
  const sqlQuery = `SELECT * FROM reviews WHERE user_id='${userId}'`;
  const res = await db.query(sqlQuery);
  return res.rows;
}

const filterByRestaurant = async (restaurant) => {
  const sqlQuery = `SELECT * FROM reviews WHERE restaurant ilike '%${restaurant}%'`;
  const res = await db.query(sqlQuery);
  return res.rows;
}

const addReview = async (userId, restaurant, review, rating) => {
  const sqlQuery = `INSERT INTO reviews(user_id, restaurant, review) VALUES ('${userId}', '${restaurant}', '${review}', ${rating})`;
  const res = await db.query(sqlQuery);
  return res.rows;
}

const addReviewWithPictures = async (userId, restaurant, review, rating, url) => {
  const sqlQuery = `INSERT INTO reviews(user_id, restaurant, review, rating, url) VALUES ('${userId}', '${restaurant}', '${review}', ${rating},'${url}')`;
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
  return res.rows;
}

const uploadToS3Bucket = async (fileName, selectedFile, fileType) => {
  const client = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    region: process.env.AWS_REGION,
    signatureVersion: 'v4',
  });

  const command = new PutObjectCommand({
    Bucket: "nomnom-store",
    Key: fileName,
    Body: selectedFile,
    ContentType: fileType,
    ACL: 'public-read'
  });

  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    console.error(err);
  }
};

const app = express();
app.use(express.json());

// const corsOptions ={
//     origin:'*', 
//     credentials:true,            //access-control-allow-credentials:true
//     methods: ['GET', 'POST'],
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from nomnom-service!');
});

app.get('/all', (req, res) => {
  getAllReviews().then(response => {
    res.send(response);
  });
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

app.get('/restaurant/:restaurant', (req, res) => {
  const { restaurant } = req.params;
  if (!restaurant) {
    res.status(400).send("invalid parameters");
  }
  filterByRestaurant(restaurant).then(response => {
    res.send(response);
  })
});

// update review table on a new posting
app.post('/post', (req, res) => {
  const { userId, restaurant, review, rating, url } = req.body;
  if (!userId || !restaurant || !review || !rating) {
    res.status(400).send("invalid parameters");
  } else {
    if (url) {
      addReviewWithPictures(userId, restaurant, review, rating, url).then(response => {
        res.send("posted successfully");
      });
    } else {
      addReview(userId, restaurant, review, rating).then(response => {
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
      const statusCode = stored['$metadata'].httpStatusCode;
      if (statusCode ===  200) {
        res.status(200).send(process.env.S3_BUCKET_URL + key);
      } else {
        res.status(400).send("bad request");
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
