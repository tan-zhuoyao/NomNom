import express from 'express';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world from nomnom-service!');
});

const port = process.env.PORT || 3000;
app.listen(port);
