const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Untitled Issue"
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "pending"
  },
  rewardPoints: {
    type: Number,
    default: 10   // 🎁 Points given when complaint is raised
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Issue", issueSchema);
