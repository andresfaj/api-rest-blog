const modelRole = require('../models/role.model');
const roleController = {}

roleController.getRoles = async(req, res) => {
    const roles = await modelRole.find();
    res.json(roles);
}

roleController.postRole = async(req, res) => {
    const { roleId, name, description } = req.body;
    var responseDetail = new modelRole({
        roleId,
        name,
        description
    });
    await responseDetail.save();
    res.json({
        response: {
            code: 0,
            description: "role saved"
        },
        responseDetail
    });
}

module.exports = roleController;