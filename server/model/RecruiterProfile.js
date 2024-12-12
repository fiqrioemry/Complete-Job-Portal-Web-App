const mongoose = require("mongoose");

const ApplicantSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  location: { type: String, required: true },
  employmentType: {
    type: String,
    enum: ["full-time", "part-time", "contract", "internship"],
    required: true,
  },
  salary: {
    min: { type: Number },
    max: { type: Number },
  },
  postedDate: { type: Date, default: Date.now },
  applicationDeadline: { type: Date },
  status: {
    type: String,
    enum: ["active", "closed"],
    default: "active",
  },
});

const JobListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  location: { type: String, required: true },
  employmentType: {
    type: String,
    enum: ["full-time", "part-time", "contract", "internship"],
    required: true,
  },
  salary: {
    min: { type: Number },
    max: { type: Number },
  },
  postedDate: { type: Date, default: Date.now },
  applicationDeadline: { type: Date },
  status: {
    type: String,
    enum: ["active", "closed"],
    default: "active",
  },
});

const RecruiterSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  companyName: { type: String, required: true },
  companyWebsite: { type: String },
  companyLogoUrl: { type: String },
  industry: { type: String, required: true },
  address: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String },
  bio: { type: String },
  socialLinks: {
    linkedin: { type: String },
    twitter: { type: String },
    facebook: { type: String },
  },
  jobListing: [JobListingSchema],
});

module.exports = mongoose.model("Recruiter", RecruiterSchema);
