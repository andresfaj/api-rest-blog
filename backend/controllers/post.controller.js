const modelBlog = require('../models/post.model');
const modelCategory = require('../models/category.model');
const modelUser = require('../models/user.model');
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
    try {
        const { title, subtitle, body, categoryId, userId, urlImage, comments } = req.body;
        console.log("titulo", title);
        const responseDetail = new modelBlog({ title, subtitle, body, categoryId, userId, urlImage, comments });
        const categoryExist = await modelCategory.findOne({ categoryId: categoryId });
        let userExist = await modelUser.findOne({ userId: userId });

        if (categoryExist && userExist) {
            await responseDetail.save();
            res.json({
                response: {
                    code: 0,
                    description: "publication saved"
                },
                responseDetail
            });
        } else if (categoryExist === null) {
            res.json({
                response: {
                    code: 1,
                    description: `The category with id:${categoryId} do not exist`
                },
                responseDetail
            });
        } else {
            res.json({
                response: {
                    code: 1,
                    description: `The user with id:${userId} do not exist`
                },
                responseDetail
            });
        }


    } catch (err) {
        console.log(err);
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