const mongoose = require("mongoose");

const RecruiterSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  firstName: String,
  lastName: String,
  companyName: String,
  bio: String,
  website: String,
  logoUrl: String,
  industry: String,
  address: String,
  phone: String,
  socials: {
    linkedin: { type: String },
    twitter: { type: String },
    facebook: { type: String },
  },
});

module.exports = mongoose.model("Recruiter", RecruiterSchema);
