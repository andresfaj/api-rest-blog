// New middlewares - funciones que se ejecutan antes del código principal
//===============
// Authentication - Verify token
//===============
const jwt = require('jsonwebtoken');

let verifyToken = (req, res, next) => {

    console.log("aqui", req.allusers);

    //Get header variables
    let token = req.get('token');
    console.log(token);

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

        // req.usuario = decoded.usuario;
        next();



    });


}

module.exports = {
    verifyToken
}