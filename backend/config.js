//---------------------------------
// ARCHIVO DE CONFIGURACIÓN GLOBAL
//--------------------------------


// PUERTO
process.env.PORT = process.env.PORT || 3000


//--
// ENTORNOS Base de datos, Desarrollo o producción
//--

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//--
// Bases de datos
//--

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/dbnaydujaramillo';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;