const modelBlog = require('../models/blog.models');
const blogController = {};

blogController.getPublication = async (req, res) => {
    const publication = await  modelBlog.findById(req.params.id);
    res.json(publication);        
}

blogController.getPublications = async (req, res) => {
    const publications = await modelBlog.find().sort({date: -1});
    res.json(publications);
}

blogController.postPublication = async (req, res) => {
    const {title, subtitle, body, urlimage, comments} = req.body;
    const publication = new modelBlog({title, subtitle, body, urlimage, comments});
    await publication.save();
    res.json({
        status: "publication saved"
    });    
}

blogController.putPublication = async (req, res) => {
    const {title, subtitle, body, urlimage} = req.body;
    await modelBlog.findByIdAndUpdate(req.params.id, {title, subtitle, body, urlimage});
    res.json({
        status: "publication updated"
    })
}

blogController.deletePublication = async (req, res) => {
    await modelBlog.findByIdAndDelete(req.params.id);
    res.json({
        status: "publication deleted"
    })
}

module.exports = blogController;