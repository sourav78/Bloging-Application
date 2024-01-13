const express = require('express')
const path = require('path')
require('dotenv').config()
const cookieParser = require('cookie-parser')

const userRoute = require("./routes/users.rouer")
const blogRoute = require("./routes/blog.router")
const { databaseConnect } = require('./config/db.config')
const jwtAuth = require('./middleware/auth.middleware')

const app = express()

databaseConnect()

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser())

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.get("/", jwtAuth, (req, res) => {

    console.log(req.user);
    res.render("home", {
        user: req.user
    })
})

app.use("/user", userRoute)
app.use("/blog", jwtAuth, blogRoute)

app.listen(process.env.PORT, () => console.log(`server started on: http://localhost:${process.env.PORT}`))