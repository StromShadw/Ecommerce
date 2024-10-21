const Category = require('../models/categoryModel')

const categoryCtrl = {
getCategory : async (req,res)=>{
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch (err) {
        res.status(500).json({mes: err.message})
    }
},
createCategory : async (req,res) =>{
try {
        res.json({mes:"check admin success!"})
} catch (err) {
    res.status(500).json({mes: err.message})
    
}
}
}

module.exports = categoryCtrl;