const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
var colors = require('colors');

//Initiliazations
const app = express();
require('./database');

//Settings
app.set('appName','Naydu Jaramillo');
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({origin: 'http://localhost:4200'}));

//Routes
app.use('/blog',require('./routes/blog.routes'));
app.get('/', (req, res) => {
    res.send('<h1> Hello World </h1>');
});

//Server
app.listen(app.get('port'), () => {
    console.log(`${app.get('appName')} backend server is running`.green);
    console.log(`Server on port ${app.get('port')}`.green)
});