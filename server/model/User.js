const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["jobseeker", "recruiter"],
    default: "jobseeker",
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
