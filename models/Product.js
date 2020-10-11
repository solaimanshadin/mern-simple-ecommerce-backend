const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product Name is required"],
        lowercase: true,
        trim: true,
    },
    price:{
        type: Number,
        required: [true, 'Product Price id required'],
        lowercase: true,
        trim: true,
    },
    description:{
        type: String,
        required: [true, 'Product Description is required'],
        lowercase: true,
        trim: true,
    },
    productImage:{
        type: String,
        required: [true, 'Product Image is required'],
        lowercase: true,
        trim: true,
    },
    
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;