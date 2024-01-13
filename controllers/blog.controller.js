const blogModel = require("../models/blog.models");

const addNewBlog = async (req, res) => {
    // console.log(req.body);
    // console.log(req.file);

    const { title, body } = req.body

    const blog = await blogModel.create({
        title,
        body,
        coverImageUrl: `./uploads/${req.file.filename}`,
        createBy: req.user.id,
    })

    return res.redirect(`/`)
}

module.exports = {
    addNewBlog
}