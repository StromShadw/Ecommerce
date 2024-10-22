const Category = require("../models/categoryModel");

const categoryCtrl = {
  getCategory: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ mes: err.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.findOne({ name });

      if (category)
        return res.status(400).json({ mes: "This category already exits!" });

      const newCategory = new Category({ name });
      await newCategory.save();
      return res.json({ mes: "Created Category Successfully!" });
    } catch (err) {
      res.status(500).json({ mes: err.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id)
        res.json({mes:"Category Delete Successfully!"})
    } catch (err) {
      res.status(500).json({ mes: err.message });
    }
  },
  updateCategory: async (req,res)=>{
    try {
        const { name } = req.body;
        await Category.findOneAndUpdate({_id: req.params.id},{name})
        res.json({mes:"Category Updated Successfully!"})
    } catch (err) {
      res.status(500).json({ mes: err.message });
    }
  } 
};

module.exports = categoryCtrl;
