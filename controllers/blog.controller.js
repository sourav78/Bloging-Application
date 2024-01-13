const blogModel = require("../models/blog.models");

const addNewBlog = async (req, res) => {

    const { title, body } = req.body

    const blog = await blogModel.create({
        title,
        body,
        coverImageUrl: `./uploads/${req.file.filename}`,
        createBy: req.user.id,
    })

    return res.redirect(`/blog/${blog._id}`)
}

module.exports = {
    addNewBlog
}