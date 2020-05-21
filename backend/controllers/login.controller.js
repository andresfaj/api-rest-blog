const modelCategory = require('../models/category.model');
const loginController = {}

loginController.postLogin = (req, res) => {
    res.json({
        response: {
            status: true,
            description: "Login was successfull"
        }
    });
}

module.exports = loginController;