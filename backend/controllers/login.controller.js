const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('underscore');
const loginController = {}

loginController.postLogin = (req, res) => {

    let body = req.body;

    UserModel.findOne({ email: body.email }, (err, dbUser) => {

        if (err) {
            return res.status(500).json({
                response: {
                    status: false,
                    err
                }
            });
        }

        if (!dbUser) {
            return res.status(400).json({
                response: {
                    status: false,
                    err: {
                        message: 'User or password wrong'
                    }
                }
            });
        }

        if (!bcrypt.compareSync(body.password, dbUser.password)) {
            return res.status(400).json({
                response: {
                    status: false,
                    err: {
                        message: 'User or password wrong'
                    }
                }
            });
        }

        dbUser = _.pick(dbUser, ['name', 'lastName', 'role', 'email', 'urlImage', 'activeUser']);

        //expiresIn: 60 segundos * 30 = 30 min
        let token = jwt.sign({
            usuario: dbUser
        }, process.env.SEED, { expiresIn: 60 * 30 });

        res.json({
            response: {
                status: true,
                description: "Login was successfull"
            },
            responseDetail: {
                token,
                dbUser
            }

        });

    })

}

module.exports = loginController;