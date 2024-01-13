const { Schema, model } = require('mongoose')

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    bolgId: {
        type: Schema.Types.ObjectId,
        ref: "blog"
    },
    createBy: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
}, { timestamps: true})

const commentModel = model("comment", commentSchema)

module.exports = commentModel