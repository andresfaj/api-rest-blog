const CategoryModel = require('../models/category.model');
const categoryController = {}

categoryController.getCategory = (req, res) => {
    let id = req.params.id;
    CategoryModel.findById(id, (err, responseDetail) => {
        if (err) {
            return res.status(500).json({
                response: {
                    status: false,
                    err
                }
            });
        }

        if (!responseDetail) {
            return res.status(400).json({
                response: {
                    status: false,
                    err: {
                        message: "ID not found"
                    }
                }
            });
        }

        res.json({
            response: {
                status: true,
            },
            responseDetail
        });

    });
}

categoryController.getCategories = (req, res) => {
    CategoryModel.find({})
        //Populate sirve para mostrar todo el contenido del objectId secundario
        .populate('userId', 'name email')
        .exec((err, responseDetail) => {
            if (err) {
                return res.status(400).json({
                    response: {
                        status: false,
                        err
                    }
                });
            }
            CategoryModel.countDocuments({}, (err, count) => {
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

categoryController.postCategory = (req, res) => {

    const { name } = req.body;
    let userId = req.usuario._id;
    var category = new CategoryModel({ name, userId });

    category.save((err, responseDetail) => {

        if (err) {
            return res.status(400).json({
                response: {
                    status: false,
                    err
                }
            })
        }

        res.json({
            response: {
                status: true,
                description: "category saved"
            },
            responseDetail
        });

    });

}

categoryController.putCategory = (req, res) => {

    let id = req.params.id;
    let body = req.body;

    CategoryModel.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, responseDetail) => {
        if (err) {
            return res.status(500).json({
                response: {
                    status: false,
                    err: err
                }
            });
        }

        if (!responseDetail) {
            return res.status(400).json({
                response: {
                    status: false,
                    err: {
                        message: "ID not found"
                    }
                }
            });
        }

        res.json({
            response: {
                status: true,
                description: "category updated"
            },
            responseDetail
        });
    });

}

categoryController.deleteCategory = (req, res) => {
    let id = req.params.id;
    console.log(id);

    CategoryModel.findByIdAndDelete(id, (err, responseDetail) => {

        if (err) {
            return res.status(500).json({
                response: {
                    status: false,
                    err: err
                }
            })
        }

        if (!responseDetail) {
            return res.status(400).json({
                response: {
                    status: false,
                    err: {
                        message: "ID not found"
                    }
                }
            });
        }

        res.json({
            response: {
                status: true,
                description: "category deleted"
            },
            responseDetail
        })

    });

}

module.exports = categoryController;