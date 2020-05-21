const modelUser = require('../models/user.model');
const loginController = {}

loginController.postLogin = (req, res) => {

    let body = req.body;

    modelUser.findOne({ email: body.email }, (err, userDB) => {

        if (err) {
            return res.status(500).json({
                response: {
                    status: false,
                    err
                }
            });
        }

        if (!userDB) {
            return res.status(400).json({
                response: {
                    status: false,
                    err: {
                        message: 'User and password wrong'
                    }
                }
            });
        }

    })

    res.json({
        response: {
            status: true,
            description: "Login was successfull"
        }
    });
}

module.exports = loginController;