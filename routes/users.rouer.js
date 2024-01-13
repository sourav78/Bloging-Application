const { Router } = require("express")
const { userSignin, userSignup } = require("../controllers/users.controllers")

const router = Router()

router.get("/signin", (req, res) => {
    res.render("signin")
})

router.get("/signup", (req, res) => {
    res.render("signup")
})

router.post("/signup", userSignup)

router.post("/signin", userSignin)

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/")
})



module.exports = router