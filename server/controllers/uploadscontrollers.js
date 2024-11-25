const Upload = require('../models/Upload');

const uploadFile = async (req, res) => {
  const userId = req.user._id; // From middleware
  const { type, link } = req.body;
  let fileName = null;

  if (req.file) {
    fileName = req.file.filename; // Assuming Multer is used for file uploads
  }

  try {
    const upload = await Upload.create({ userId, type, link, name: fileName });
    res.json(upload);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error });
  }
};

module.exports = { uploadFile };
