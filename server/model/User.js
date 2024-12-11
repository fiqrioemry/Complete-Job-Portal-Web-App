const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["jobseeker", "recruiter", "admin"],
    default: "jobseeker",
    required: true,
  },
  SeekerProfile: [{ type: Schema.Types.ObjectId, ref: "SeekerProfile" }],
});

module.exports = mongoose.model("User", UserSchema);
