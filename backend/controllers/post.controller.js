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
    const { title, subtitle, body, urlimage } = req.body;
    await modelBlog.findByIdAndUpdate(req.params.id, { title, subtitle, body, urlimage });
    res.json({
        description: "publication updated"
    })
}

blogController.deletePublication = async(req, res) => {
    await modelBlog.findByIdAndDelete(req.params.id);
    res.json({
        description: "publication deleted"
    })
}

module.exports = blogController;