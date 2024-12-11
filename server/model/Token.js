const { default: mongoose } = require("mongoose");

const TokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  refreshToken: String,
});

module.exports = mongoose.model("Token", TokenSchema);
