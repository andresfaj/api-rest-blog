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

//Global routes
app.use(require('./routes/index'));

//Server
app.listen(process.env.PORT, () => {
    console.log(`${app.get('appName')} backend server is running`.green);
    console.log(`Server on port ${process.env.PORT}`.green)
});