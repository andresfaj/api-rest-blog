const BlogModel = require('../models/post.model');
const blogController = {};

blogController.getPublication = (req, res) => {
    let id = req.params.id;
    BlogModel.findById(id, (err, responseDetail) => {
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

blogController.getPublications = (req, res) => {

    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 5;
    limit = Number(limit);

    if (req.query.active === 'false') {

        BlogModel.find({ activePost: false })
            .sort({ date: -1 })
            .skip(from)
            .limit(limit)
            .exec((err, responseDetail) => {
                if (err) {
                    return res.status(400).json({
                        response: {
                            status: false,
                            err
                        }
                    });
                }
                BlogModel.countDocuments({ activePost: false }, (err, count) => {
                    return res.json({
                        response: {
                            status: true,
                            count
                        },
                        responseDetail
                    })
                })
            });
    } else {
        BlogModel.find({ activePost: true })
            .sort({ date: -1 })
            .skip(from)
            .limit(limit)
            .exec((err, responseDetail) => {
                if (err) {
                    return res.status(400).json({
                        response: {
                            status: false,
                            err
                        }
                    });
                }
                BlogModel.countDocuments({ activePost: true }, (err, count) => {
                    return res.json({
                        response: {
                            status: true,
                            count
                        },
                        responseDetail
                    })
                })
            });
    }
}

blogController.postPublication = (req, res) => {
    const { title, subtitle, body, categoryId, urlImage, activePost, comments } = req.body;
    let userEmail = req.usuario.email;
    const blog = new BlogModel({ title, subtitle, body, categoryId, userEmail, urlImage, activePost, comments });

    blog.save((err, responseDetail) => {
        if (err) {
            return res.status(400).json({
                response: {
                    status: false,
                    err
                }
            })
        }

        res.status(201).json({
            response: {
                status: true,
                description: "publication saved"
            },
            responseDetail
        })
    });
}

blogController.putPublication = (req, res) => {
    let id = req.params.id;
    let body = req.body;

    BlogModel.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, responseDetail) => {
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
                description: "publication updated"
            },
            responseDetail
        });
    });
}

blogController.deletePublication = (req, res) => {

    let id = req.params.id;
    let changeActivePost = {
        activePost: false
    }

    // BlogModel.findByIdAndRemove(id, (err, responseDetail) => {
    BlogModel.findByIdAndUpdate(id, changeActivePost, { new: true }, (err, responseDetail) => {
        if (err) {
            return res.status(500).json({
                response: {
                    status: false,
                    err
                }
            });
        };

        if (!responseDetail) {
            return res.status(400).json({
                response: {
                    status: false,
                    err: {
                        message: 'ID not found'
                    }
                }
            })
        }

        res.json({
            response: {
                status: true,
                description: 'Publication deleted'
            },
            responseDetail
        })

    })
}

module.exports = blogController;