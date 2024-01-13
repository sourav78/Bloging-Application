const express = require("express")
const userModel = require("../models/users")

const userSignup = async (req, res) => {
    const { fullName, email, password } = req.body

    await userModel.create({
        fullName,
        email,
        password,
    })

    return res.redirect("/")
}

const userSignin = async (req, res) => {
    const { email, password } = req.body

    try {
        const token = await userModel.matchPasswordAndCreateToken(email, password)

        // console.log(token);

        return res.cookie("token", token).redirect("/")
    } catch (error) {
        return res.render("signin", {
            error: "Incorrect email and password"
        })
    }
}


module.exports = {
    userSignin,
    userSignup
}