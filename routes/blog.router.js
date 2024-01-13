const { Router } = require("express");
const multer = require('multer')
const path = require('path')

const { addNewBlog } = require("../controllers/blog.controller");
const blogModel = require("../models/blog.models");

const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./public/uploads`)
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`
        cb(null, filename)
    }
})

const upload = multer({ storage: storage })

router.get("/add-new", (req, res) => {
    return res.render("addBlogs", {
        user: req.user
    })
})

router.get("/:id", async (req, res) => {
    const blog = await blogModel.findById(req.params.id).populate("createBy")
    console.log(blog);
    return res.render("blog", {
        user: req.user,
        blog
    })
})

router.post("/", upload.single('coverImage'), addNewBlog)

module.exports = router