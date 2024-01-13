const { Router } = require("express");
const multer = require('multer')
const path = require('path')

const { addNewBlog } = require("../controllers/blog.controller");
const blogModel = require("../models/blog.models");
const commentModel = require("../models/comments.models");

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
    const comments = await commentModel.find({ bolgId: req.params.id}).populate("createBy")
    console.log(comments);
    return res.render("blog", {
        user: req.user,
        blog,
        comments
    })
})

router.post("/comment/:blogId", (req, res) => {
    commentModel.create({
        content: req.body.content,
        bolgId: req.params.blogId,
        createBy: req.user.id 
    })

    return res.redirect(`/blog/${req.params.blogId}`)
})

router.post("/", upload.single('coverImage'), addNewBlog)

module.exports = router