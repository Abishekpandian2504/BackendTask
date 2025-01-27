const express = require("express");
const customers = require('../routes/customers');
const genres = require("../routes/genres");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');


module.exports = function(app) {
    app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

// app.use(function(err, req, res, next) {
//     // Log the exeception
//     res.status(500).send("Something failed.");
// })

app.use(error); // we are not calling this function, simply passing reference to the function.
}