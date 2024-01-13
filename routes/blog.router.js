const { Router } = require("express");
const multer = require('multer')
const path = require('path')

const { addNewBlog } = require("../controllers/blog.controller");

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

    // console.log(req.user);
    return res.render("addBlogs", {
        user: req.user
    })
})

router.post("/", upload.single('coverImage'), addNewBlog)

module.exports = router