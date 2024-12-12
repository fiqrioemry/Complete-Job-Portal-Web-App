const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  employment: {
    type: String,
    enum: ["full-time", "part-time", "contract", "internship"],
    required: true,
  },
  requirement: [{ type: String }],
  salary: {
    minimum: Number,
    maximum: Number,
  },
  location: { type: String, required: true },
  posted: { type: Date, default: Date.now },
  deadline: { type: Date },
  status: {
    type: String,
    enum: ["open", "close"],
    default: "open",
  },
});

module.exports = mongoose.model("Job", JobSchema);
