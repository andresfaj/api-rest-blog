const modelProfile = require('../models/profile.model');
const profileController = {}

profileController.postProfile = async(req, res) => {
    const { name, description } = req.body;
    var profile = new modelProfile({
        name,
        description
    });
    await profile.save();
    res.json({
        status: "profile saved"
    });
}

module.exports = profileController;