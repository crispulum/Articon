//core node packages
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const path = require('path');
const { MongoClient } = require('mongodb');
const app = express();

//import routes

const artApiRouter = require('./routes/artApi');
const userRouter = require('./routes/userRoute');

const dotenv = require('dotenv').config();

const PORT = 3000;
app.use(cookieParser());

// MongoDB Connection

const MONGO_URI = `mongodb+srv://bibaswe:${process.env.MONGO_PWD}@articoncluster.oobwhak.mongodb.net/articondb?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

//Handle static assets, handle JSONS, encoded URLS

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: 'ooooooh-secret-keeeeeeey',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static(path.join(__dirname, '..', 'build')));

app.use('/art', artApiRouter);
app.use('/api/users', userRouter);

app.use((req, res) => res.status(404).send('Error 404, path not found'));



app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: err},
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  console.log(err)
  return res.status(errorObj.status).json(errorObj.message);
});
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
