const express = require("express")
const userModel = require("../models/users")

const userSignup = async (req, res) => {
    const { fullName, email, password} = req.body

    await userModel.create({
        fullName,
        email,
        password,
    })

    return res.redirect("/")
}

const userSignin = async (req, res) => {
    const { email, password } = req.body

    const user = await userModel.matchPassword(email, password)

    console.log(user);

    return res.redirect("/")
}


module.exports = {
    userSignin,
    userSignup
}