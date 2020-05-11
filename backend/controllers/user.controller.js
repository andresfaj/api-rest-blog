const modelUser = require('../models/user.model');
const modelRole = require('../models/role.model');
const userController = {}

userController.getUsers = async(req, res) => {
    const users = await modelUser.find();
    res.json(users);
}

userController.postUser = async(req, res) => {
    const { userId, name, lastName, roleId, email } = req.body;
    const responseDetail = new modelUser({ userId, name, lastName, roleId, email });
    let roleExist = await modelRole.findOne({ roleId: roleId });
    if (roleExist) {
        await responseDetail.save();
        res.json({
            response: {
                code: 0,
                description: "user saved"
            },
            responseDetail
        });
    }
    res.json({
        response: {
            code: 1,
            description: `The role with id:${roleId} do not exist`
        },
        responseDetail
    });
}

module.exports = userController;