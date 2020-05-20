const modelCategory = require('../models/category.model');
const categoryController = {}

categoryController.getCategories = (req, res) => {
    modelCategory.find({})
        .exec((err, responseDetail) => {
            if (err) {
                return res.status(400).json({
                    response: {
                        status: false,
                        err
                    }
                });
            }
            modelCategory.countDocuments({}, (err, count) => {
                res.json({
                    response: {
                        status: true,
                        count
                    },
                    responseDetail
                })
            })
        })

}

categoryController.postCategory = async(req, res) => {
    const { name } = req.body;
    console.log(name);
    var category = new modelCategory({ name });
    try {
        let responseDetail = await category.save();
        res.json({
            response: {
                status: true,
                description: "category saved"
            },
            responseDetail
        });
    } catch (err) {
        res.status(400).json({
            response: {
                status: false,
                err
            }
        })
    }
}

categoryController.putCategory = async(req, res) => {

    let id = req.params.id;
    let body = req.body;

    try {
        let responseDetail = await modelCategory.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' });
        res.json({
            response: {
                status: true,
                description: "category updated"
            },
            responseDetail
        });

    } catch (err) {
        res.status(400).json({
            response: {
                status: false,
                err: err
            }
        });
    }
}

categoryController.deleteCategory = (req, res) => {
    let id = req.params.id;
    console.log(id);

    modelCategory.findByIdAndDelete(id, (err, responseDetail) => {

        if (err) {
            return res.status(400).json({
                response: {
                    status: false,
                    err: err
                }
            })
        }

        res.json({
            response: {
                status: true,
                description: "publication deleted"
            },
            responseDetail
        })

    });

}

module.exports = categoryController;