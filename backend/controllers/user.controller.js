const UserModel = require('../models/user.model');
const _ = require('underscore');
const userController = {}

userController.getUser = (req, res) => {
    let id = req.params.id;
    UserModel.findById(id, (err, responseDetail) => {
        if (err) {
            return res.status(500).json({
                response: {
                    status: false,
                    err
                }
            });
        }

        if (!responseDetail) {
            return res.status(400).json({
                response: {
                    status: false,
                    err: {
                        message: "ID not found"
                    }
                }
            });
        }

        res.json({
            response: {
                status: true,
            },
            responseDetail
        });

    });
}

userController.getUsers = (req, res) => {

    //For to use the jwt payload
    // return res.json({
    //     usuario: req.usuario.name
    // })

    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 5;
    limit = Number(limit);

    if (req.query.active === 'false') {

        UserModel.find({ activeUser: false })
            .skip(from)
            .limit(limit)
            .exec((err, responseDetail) => {
                if (err) {
                    return res.status(400).json({
                        response: {
                            status: false,
                            err
                        }
                    });
                }
                UserModel.countDocuments({ activeUser: false }, (err, count) => {
                    return res.json({
                        response: {
                            status: true,
                            count
                        },
                        responseDetail
                    })
                })
            })

    } else {

        UserModel.find({ activeUser: true })
            //from user, desde el usuario = from + 1
            .skip(from)
            //Shows only five users
            .limit(limit)
            .exec((err, responseDetail) => {
                if (err) {
                    return res.status(400).json({
                        response: {
                            status: false,
                            err
                        }
                    });
                }

                UserModel.countDocuments({ activeUser: true }, (err, count) => {
                    return res.json({
                        response: {
                            status: true,
                            count
                        },
                        responseDetail
                    })
                })


            })
    }

}

userController.postUser = async(req, res) => {

    const { firstName, lastName, role, email, password, activeUser, urlImage } = req.body;
    const responseDetail = new UserModel({ firstName, lastName, role, email, password, activeUser, urlImage });
    if (responseDetail.password === undefined) {
        return res.json({
            response: {
                status: false,
                err: {
                    message: 'A password is required'
                }
            }
        })
    } else {
        responseDetail.password = await responseDetail.encryptPassword(responseDetail.password);
    }

    responseDetail.save((err, responseDetail) => {
        if (err) {
            return res.status(400).json({
                response: {
                    status: false,
                    err
                }
            });
        }
        //Se quita el dato de la contraseña para que no sea visible en el JSON
        responseDetail.password = null;
        res.status(201).json({
            response: {
                status: true,
                description: "user saved"
            },
            responseDetail
        });
    });
}

userController.putUser = (req, res) => {

    let id = req.params.id;
    //.pick sirve para obtener solo lo que se necesita, los demás campos no los incluye asi le llegen
    let body = _.pick(req.body, ['firstName', 'lastName', 'role', 'email', 'urlImage', 'activeUser']);
    // delete body.password;

    UserModel.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, responseDetail) => {
        if (err) {
            return res.status(500).json({
                response: {
                    status: false,
                    err
                }
            });
        }

        if (!responseDetail) {
            return res.status(400).json({
                response: {
                    status: false,
                    err: {
                        message: 'ID not found'
                    }
                }
            })
        }
        res.json({
            response: {
                status: true,
                description: "user updated"
            },
            responseDetail
        });
    });
}

userController.deleteUser = (req, res) => {

    let id = req.params.id;
    let changeActiveUser = {
        activeUser: false
    }

    // UserModel.findByIdAndRemove(id, (err, responseDetail) => {
    UserModel.findByIdAndUpdate(id, changeActiveUser, { new: true }, (err, responseDetail) => {
        if (err) {
            return res.status(500).json({
                response: {
                    status: false,
                    err
                }
            });
        }

        if (!responseDetail) {
            return res.status(400).json({
                response: {
                    status: false,
                    err: {
                        message: 'ID not found'
                    }
                }
            })

        }

        res.json({
            response: {
                status: true,
                description: 'user deleted'
            },
            responseDetail
        })

    })

}

module.exports = userController;