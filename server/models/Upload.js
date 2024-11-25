const mongoose = require('mongoose');

const UploadSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  link: { type: String },
  name: { type: String }, // File name (if uploaded)
});

const UploadModel = mongoose.model('Upload', UploadSchema);

module.exports = UploadModel;
