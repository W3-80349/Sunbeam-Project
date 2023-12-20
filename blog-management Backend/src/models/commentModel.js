const mongoose = require('mongoose');
 const ObjectId = mongoose.Schema.Types.ObjectId;

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  post: {
    type: ObjectId,
    ref: 'BlogPost',
    required: true,
  },
},{
    timestamps: true,
});