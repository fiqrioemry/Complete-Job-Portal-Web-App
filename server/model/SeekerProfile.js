const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  institution: String,
  fieldOfStudy: String,
  startDate: Date,
  endDate: Date,
});

const ExperienceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  company: String,
  position: String,
  startDate: { type: Date },
  endDate: { type: Date },
  description: String,
});

const CertificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  issuedBy: String,
  issueDate: { type: Date },
  credentialId: String,
});

const SeekerProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  gender: { type: String, enum: ["male", "female"] },
  birthday: Date,
  phone: String,
  address: String,
  education: [EducationSchema],
  experience: [ExperienceSchema],
  certification: [CertificationSchema],
  skills: String,
  resumeUrl: String,
});

module.exports = mongoose.model("SeekerProfile", SeekerProfileSchema);
