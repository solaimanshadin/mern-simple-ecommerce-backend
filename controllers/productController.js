const Product = require('../models/Product')
module.exports.product_index =  async (req, res) => {
    try{
        const products = await Product.find()
        res.send(products)
    }catch(err) {
        console.log(err)
    }
}

module.exports.product_create = async (req, res) => {
    try{
        const product = await Product.create(req.body);
        res.send(product)
    }catch(err){
        console.log(err)
    }
}

module.exports.product_details = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        res.send(product)
    }catch(err){
        console.log(err)
    }
}


module.exports.product_update = async (req, res) => {
    const data = req.body;
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, data);
        res.send(product)
    }catch(err){
        console.log(err)
    }
}

