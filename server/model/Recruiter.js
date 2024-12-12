const mongoose = require("mongoose");

const RecruiterSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  name: { type: String, required: true },
  bio: { type: String },
  website: { type: String },
  logoUrl: { type: String },
  industry: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String },
  socials: {
    linkedin: { type: String },
    twitter: { type: String },
    facebook: { type: String },
  },
});

module.exports = mongoose.model("Recruiter", RecruiterSchema);
