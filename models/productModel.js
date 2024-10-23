const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_id: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    title: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    price:{
        type:String,
        trim:true,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    checked:{
        type:Boolean,
        default:false
    },
    sold:{
        type:Number,
        default:0,
    },
    images:{
        type:Object,
        required:true,
    },
}, { timestamps: true })

const Products = mongoose.model('Products', productSchema)
module.exports = Products;