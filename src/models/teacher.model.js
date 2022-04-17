const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    gender: {type: String, required: true},
    pic: {type: String},
    age:{type: Number, required: true}
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model('teacher',teacherSchema);