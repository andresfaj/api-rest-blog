const modelBlog = require('../models/post.model');
const blogController = {};

blogController.getPublication = async(req, res) => {
    const publication = await modelBlog.findById(req.params.id);
    res.json(publication);
}

blogController.getPublications = (req, res) => {

    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 5;
    limit = Number(limit);

    if (req.query.active === 'false') {

        modelBlog.find({ activePost: false })
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
                modelBlog.countDocuments({ activePost: false }, (err, count) => {
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
        modelBlog.find({ activePost: true })
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
                modelBlog.countDocuments({ activePost: true }, (err, count) => {
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

blogController.postPublication = async(req, res) => {
    const { title, subtitle, body, categoryId, userEmail, urlImage, activePost, comments } = req.body;
    const responseDetail = new modelBlog({ title, subtitle, body, categoryId, userEmail, urlImage, activePost, comments });
    try {

        await responseDetail.save();
        res.json({
            response: {
                status: true,
                description: "publication saved"
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

blogController.putPublication = async(req, res) => {
    let body = req.body;
    try {
        let responseDetail = await modelBlog.findByIdAndUpdate(req.params.id, body, { new: true, runValidators: true });
        res.json({
            response: {
                status: true,
                description: "publication updated"
            },
            responseDetail
        });

    } catch (err) {
        res.status(400).json({
            response: {
                status: false,
                err
            }
        });
    }
}

blogController.deletePublication = (req, res) => {

    let id = req.params.id;
    let changeActivePost = {
        activePost: false
    }

    // modelBlog.findByIdAndRemove(id, (err, responseDetail) => {
    modelBlog.findByIdAndUpdate(id, changeActivePost, { new: true }, (err, responseDetail) => {
        if (err) {
            return res.status(400).json({
                response: {
                    status: false,
                    err
                }
            });
        };

        if (responseDetail === null) {
            return res.status(400).json({
                response: {
                    status: false,
                    err: {
                        message: 'Publication not found'
                    }
                }
            })
        }

        res.json({
            response: {
                status: true,
                description: 'post deleted'
            },
            responseDetail
        })

    })
}

module.exports = blogController;