const User = require('../models/User');
const jwt  = require('jsonwebtoken');

const errorHandler = (err) => {
    const errors = {fullName: "", email: "", password: ""}
    
    if(err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({properties})=> {
            errors[properties.path] = properties.message;
        })
    }

    if(err.message === "Invalid password") {
        errors.password = "Invalid password"
    }

    if(err.code === 11000){
        errors.email = "Email already exits"
    }

    return errors
}
console.log("sec" , process.env.SECRET)
const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET, {
        expiresIn: 1000 * 60 * 60 * 24 *30
    })
}

module.exports.signup_post = async(req, res, next) => {
    try{
        const user =  await User.create(req.body);
        const token = createToken(user._id);
        const authUser = {user, token}
        console.log(user)
        res.send(authUser)
    }catch (err) {
       const errors = errorHandler(err);
       res.status(400).json({errors})
       console.log(err)
    }
}

module.exports.login_post= async(req, res, next) => {
    try{
        const {email, password} = req.body;

        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.send({user, token})
    }catch(err){
        const errors = errorHandler(err)
        res.status(401).json({errors})
    }
}

module.exports.getCurrentUser =  (req, res) => {
    if(req.headers.authorization) {
        jwt.verify(req.headers.authorization, process.env.SECRET, async (err, decoded) => {
            if(err) {
                res.status(401).send("Unauthorized")
            }else{
                const user = await User.findById(decoded.id)
                
                res.send({user})
            }
        })
    }else{
        res.status(401).send("Unauthorized")
    }
    
}