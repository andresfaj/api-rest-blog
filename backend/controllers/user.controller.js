const modelUser = require('../models/user.model');
const userController = {}

userController.getUsers = async(req, res) => {
    const users = await modelUser.find();
    res.json(users);
}

userController.postUser = async(req, res) => {

    const { name, lastName, role, email, password, urlImage } = req.body;
    const responseDetail = new modelUser({ name, lastName, role, email, password, urlImage });
    try {
        await responseDetail.save();
        res.json({
            response: {
                code: 0,
                description: "user saved"
            },
            responseDetail
        });

    } catch (err) {
        console.log('que kaka');
        res.status(400).json({
            response: {
                code: 1,
                description: err
            },
            responseDetail
        });
    }
}

module.exports = userController;