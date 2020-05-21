const express = require('express');

const app = express();

app.use('/blog', require('./post.route'));
app.use(require('./user.route'));
app.use(require('./category.route'));
app.use(require('./login.route'));
app.get('/', (req, res) => {
    res.send('<h1> This is Naydú Jaramillo Backend server </h1>');
});

module.exports = app;