const modelUser = require('../models/user.model');
const userController = {}

userController.postUser = async(req, res) => {
    const { name, lastName, profileId, email } = req.body;
    const user = new modelUser({
        name,
        lastName,
        profileId,
        email
    });
    await user.save();
    res.json({
        status: "user saved"
    });
}


module.exports = userController;