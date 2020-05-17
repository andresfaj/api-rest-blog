const modelUser = require('../models/user.model');
const _ = require('underscore');
const userController = {}

userController.getUsers = async(req, res) => {
    const users = await modelUser.find();
    res.json(users);
}

userController.postUser = async(req, res) => {

    const { name, lastName, role, email, password, activeUser, urlImage } = req.body;
    const responseDetail = new modelUser({ name, lastName, role, email, password, activeUser, urlImage });
    responseDetail.password = await responseDetail.encryptPassword(responseDetail.password);
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
    let body = _.pick(req.body, ['name', 'lastName', 'role', 'email', 'urlImage', 'activeUser']);
    // delete body.password;
    try {
        let responseDetail = await modelUser.findByIdAndUpdate(id, body, { new: true, runValidators: true });
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

module.exports = userController;