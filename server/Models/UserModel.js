import mongoose from "mongoose";

const newUserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: { // New field
    type: Boolean,
    default: false,
  },profilePic: { 
    type: String, 
  }, 
 
});

const UserModel = mongoose.model("newusers", newUserSchema);
export default UserModel;