const jwt = require('jsonwebtoken')

const secret = "Iamjulu"

function createTokenForUsers(user){
    const payload = {
        id: user._id,
        email: user.email,
        profileImage: user.userProfileUrl,
        role: user.role
    }

    const token = jwt.sign(payload, secret)

    return token
}

function validateToken(token){
    const payload = jwt.verify(token,  secret)

    return payload
}

module.exports = {
    createTokenForUsers,
    validateToken
}