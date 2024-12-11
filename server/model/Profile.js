const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  firstname: String,
  lastname: String,
  gender: { type: String, enum: ["male", "female"] },
  birthday: Date,
  bio: String,
  location: String,
  phone: String,
});

module.exports = mongoose.model("Profile", ProfileSchema);
