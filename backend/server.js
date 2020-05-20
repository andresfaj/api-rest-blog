const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
var colors = require('colors');

//Initiliazations
const app = express();
require('./database');

//Settings
app.set('appName', 'Naydu Jaramillo');
// app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:4200' }));

//Routes
app.use('/blog', require('./routes/post.route'));
app.use(require('./routes/user.route'));
app.use(require('./routes/category.route'));
app.use(require('./routes/login.route'));
app.get('/', (req, res) => {
    res.send('<h1> This is Naydú Jaramillo Backend server </h1>');
});

//Server
app.listen(process.env.PORT, () => {
    console.log(`${app.get('appName')} backend server is running`.green);
    console.log(`Server on port ${process.env.PORT}`.green)
});