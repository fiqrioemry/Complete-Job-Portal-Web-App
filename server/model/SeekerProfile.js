const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema({
  userId: String,
  institution: String,
  fieldOfStudy: String,
  startDate: Date,
  endDate: Date,
});

const ExperienceSchema = new mongoose.Schema({
  userId: String,
  company: String,
  position: String,
  startDate: { type: Date },
  endDate: { type: Date },
  description: String,
});

const CertificationSchema = new mongoose.Schema({
  userId: String,
  name: String,
  issuedBy: String,
  issueDate: { type: Date },
  credentialId: String,
});

const SeekerProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  firstname: String,
  lastname: String,
  gender: { type: String, enum: ["male", "female"] },
  birthday: Date,
  phone: String,
  address: String,
  bio: String,
  resumeUrl: String,
  education: [EducationSchema],
  experience: [ExperienceSchema],
  certification: [CertificationSchema],
  skills: [{ type: String }],
});

module.exports = mongoose.model("SeekerProfile", SeekerProfileSchema);
