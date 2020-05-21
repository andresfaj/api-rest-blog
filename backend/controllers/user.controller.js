const UserModel = require('../models/user.model');
const _ = require('underscore');
const userController = {}

userController.getUsers = (req, res) => {

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

    const { name, lastName, role, email, password, activeUser, urlImage } = req.body;
    const responseDetail = new UserModel({ name, lastName, role, email, password, activeUser, urlImage });
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
    try {
        await responseDetail.save();
        //Se quita el dato de la contraseña para que no sea visible en el JSON
        responseDetail.password = null;
        res.json({
            response: {
                status: true,
                description: "user saved"
            },
            responseDetail
        });

    } catch (err) {
        res.status(400).json({
            response: {
                status: false,
                err
            }
        });
    }
}

userController.putUser = async(req, res) => {

    let id = req.params.id;
    //.pick sirve para obtener solo lo que se necesita, los demás campos no los incluye asi le llegen
    let body = _.pick(req.body, ['name', 'lastName', 'role', 'email', 'urlImage', 'activeUser']);
    // delete body.password;
    try {
        let responseDetail = await UserModel.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' });
        responseDetail.password = null;
        res.json({
            response: {
                status: true,
                description: "user updated"
            },
            responseDetail
        });

    } catch (err) {
        res.status(400).json({
            response: {
                status: false,
                err
            }
        });
    }
}

userController.deleteUser = (req, res) => {

    let id = req.params.id;
    let changeActiveUser = {
        activeUser: false
    }

    // UserModel.findByIdAndRemove(id, (err, responseDetail) => {
    UserModel.findByIdAndUpdate(id, changeActiveUser, { new: true }, (err, responseDetail) => {
        if (err) {
            return res.status(400).json({
                response: {
                    status: false,
                    err
                }
            });
        }

        if (responseDetail === null) {
            return res.status(400).json({
                response: {
                    status: false,
                    err: {
                        message: 'User not found'
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