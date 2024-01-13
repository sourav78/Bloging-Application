const mongoose = require('mongoose')
const { createHmac, randomBytes } = require('crypto')
const { createTokenForUsers } = require('../services/authentication')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    userProfileUrl: {
        type: String,
        default: "./public/images/default.jpg"
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, { timestamps: true })

userSchema.pre("save", function (next) {
    const user = this

    if (!this.isModified('password')) return

    const salt = randomBytes(16).toString()
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex")

    this.salt = salt
    this.password = hashedPassword

    next()
})

userSchema.static("matchPasswordAndCreateToken", async function(email, password){
    const user = await this.findOne({email})

    if(!user) throw new Error("Invalid username and passowrd")

    const salt = user.salt
    const hashPassword = user.password

    const providedHash = createHmac("sha256", salt)
        .update(password)
        .digest("hex")

    if(hashPassword !== providedHash) throw new Error("Invalid Password")

    // user.password = undefined
    // user.salt = undefined

    const token = createTokenForUsers(user)

    return token
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel