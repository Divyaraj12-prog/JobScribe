const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  title: {
    type: String,
    required: true
  },

  fileUrl: {
    type: String,
    required: true
  },

  originalName: {
    type: String
  },

  atsScore: {
    type: Number,
    default: null
  },

  analysis: {
    type: [String],
    default: null
  },

  missingKeywords: {
    type: [String],
    default: []
  },
  matchScore: {
    type: Number,
    default: null
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("resume", resumeSchema);