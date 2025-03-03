
const error = require('./middleware/error');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);
const customers = require('./routes/customers');
const genres = require("./routes/genres");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require("express");
const app = express();


if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    // process is a global object using exit. here 0 is success other than 0 is error.
    process.exit(1)
}

mongoose.connect('mongodb://localhost:27017')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'))

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(function(err, req, res, next) {
    // Log the exeception
    res.status(500).send("Something failed.");
})

app.use(error); // we are not calling this function, simply passing reference to the function.

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));



