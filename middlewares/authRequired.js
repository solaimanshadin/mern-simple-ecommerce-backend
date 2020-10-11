const { json } = require('express');
const jwt = require('jsonwebtoken');

module.exports.authRequired = async (req, res, next) => {
    const auth = jwt.verify(req.headers.authorization, process.env.SECRET, (err, decoded) => {
        if(err) {
            res.status(401).send("Unauthorized")
        }else{
            console.log(decoded)
        }
    })
    next();
}