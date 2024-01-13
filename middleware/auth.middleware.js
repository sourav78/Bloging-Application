const { validateToken } = require("../services/authentication")

const jwtAuth = (req, res, next) => {
    const token = (req.cookies && req.cookies.token) || null

    if(!token) return res.render("signin", {
        error: "Not authorized"
    })

    try {
        const payload = validateToken(token)
        req.user = payload
    } catch (error) {
        // return res.render("signin", {
        //     error: "Not authorized"
        // })
    }

    next()
}

module.exports = jwtAuth