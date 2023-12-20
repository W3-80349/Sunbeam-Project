const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    content:{
        type:String,
        required: true,
    },
    authorId:{
        type:ObjectId,
        ref:User,
        required: true,
    },
    category:{
        type:ObjectId,
        ref:Category,
        required: true,
    },
    subcategory:{
        type:[String],
        trim:true
    },
    tags:{
        type:String,
        trim:true
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
},
{
    timestamps:true,
}
)

module.exports = mongoose.model('BlogPost', postSchema);