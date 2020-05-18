const mongoose = require('mongoose');
require('./config');


//const URI = 'mongodb://localhost:27017/dbnaydujaramillo';

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("DB is connected");
});