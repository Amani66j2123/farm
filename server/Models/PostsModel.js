import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  postMsg: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  likes: {
    count: { type: Number, default: 0 },
    users: [{ type: String }] // Array of user IDs who liked the post
  },
  dislikes: {  // Add this!
    count: { type: Number, default: 0 },
    users: [{ type: String }] // Array of user IDs who disliked the post
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const PostModel = mongoose.model("psuggestions",postSchema);
export default PostModel;
