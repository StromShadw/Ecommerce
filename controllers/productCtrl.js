const Products = require('../models/productModel')

//sort, filtering, poginating

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString
    }
    filtering() {
        const queryObj = { ...this.queryString }

        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete (queryObj[el]))
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
        this.query.find(JSON.parse(queryStr))
        console.log(queryStr)
        return this;
    }
    sorting() { }
    paginating() { }
}


const productCtrl = {
    getProducts: async (req, res) => {
        try {
            const features = new APIfeatures(Products.find(), req.query).filtering()
            const products = await features.query
            return res.json(products)
        } catch (err) {
            return res.status(500).json({ mes: err.message })
        }
    },
    createProduct: async (req, res) => {
        try {
            const { product_id, title, price, description, content, images, category } = req.body;
            if (!images) return res.status(400).json({ mes: "No image upload" })

            const product = await Products.findOne({ product_id })
            if (product) return res.status(400).json({ mes: "this product already exits" })

            const newProduct = new Products({
                product_id, title: title.toLowerCase(), price, description, content, images, category
            })
            await newProduct.save()
            return res.json({ mes: "Product Created!" })
        } catch (err) {
            return res.status(500).json({ mes: err.message })
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { title, price, description, content, images, category } = req.body
            if (!images) return res.status(400).json({ mes: "no image upload" })
            await Products.findOneAndUpdate({ _id: req.params.id }, {
                title: title.toLowerCase(), price, description, content, images, category
            })
            res.json({ mes: "Product Updated!" })
        } catch (err) {
            return res.status(500).json({ mes: err.message })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({ mes: "Product Deleted Successfully!" })
            return res.json({ mes: "Product Updated!" })
        } catch (err) {
            return res.status(500).json({ mes: err.message })
        }
    },
}

module.exports = productCtrl