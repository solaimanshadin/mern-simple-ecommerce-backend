const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Name is required!"],
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
        minlength: [6, "Password must be longer then or equal to 6 character"]
    }
}, {timestamps: true})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email})
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return user
        }
        throw Error("Invalid password")
    }

    throw Error("Email not exists")
}

const User = mongoose.model('User', userSchema);

module.exports = User;