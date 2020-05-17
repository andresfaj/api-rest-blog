const modelBlog = require('../models/post.model');
const blogController = {};

blogController.getPublication = async(req, res) => {
    const publication = await modelBlog.findById(req.params.id);
    res.json(publication);
}

blogController.getPublications = async(req, res) => {
    const publications = await modelBlog.find().sort({ date: -1 });
    res.json(publications);
}

blogController.postPublication = async(req, res) => {
    const { title, subtitle, body, categoryId, userEmail, urlImage, comments } = req.body;
    const responseDetail = new modelBlog({ title, subtitle, body, categoryId, userEmail, urlImage, comments });
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