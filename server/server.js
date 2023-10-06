//core node packages
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const { MongoClient } = require('mongodb');
const app = express();





//third party modules



//custom packages

//e.g. we import our models, controllers, and routes here



const PORT = 3000;
app.use(cookieParser());


//MongoDB Connection stuff.
//Binette, we'll need to update this URL. I'm not quite sure how it works for you, since you used Compass and not a local DB.
mongoose.connect('mongodb://localhost/FortuneApp', {
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

app.use(express.static(path.join(__dirname, '..', 'build')));


app.use((req, res) => res.status(404).send('Error 404, path not found'));

app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
})
app.listen(PORT, () => { console.log(`Listening on port ${PORT}...`); });




