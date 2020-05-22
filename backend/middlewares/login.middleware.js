// New middlewares - funciones que se ejecutan antes del código principal
//===============
// Authentication - Verify token
//===============
const jwt = require('jsonwebtoken');

let verifyToken = (req, res, next) => {

    //Get header variables
    let token = req.get('token');

    //decoded is the same to paylod
    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                response: {
                    status: false,
                    err
                }
            })
        }

        //For to use the jwt payload
        req.usuario = decoded.usuario;
        next();

    });
}

module.exports = {
    verifyToken
}