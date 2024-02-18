import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default:
        "https://utfs.io/f/4d1bcef1-133e-4cc8-945f-65cd57f57c6a-psn5nt.jpeg",
    },
    bio: {
      type: String,
      default: "No bio yet",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
