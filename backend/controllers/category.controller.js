const modelCategory = require('../models/category.model');
const categoryController = {}

categoryController.getCategories = async(req, res) => {
    const categories = await modelCategory.find();
    res.json(categories);
}

categoryController.postCategory = async(req, res) => {
    const { categoryId, name } = req.body;
    var category = new modelCategory({
        categoryId,
        name
    });
    await category.save();
    res.json({
        status: "category saved"
    });
}

module.exports = categoryController;