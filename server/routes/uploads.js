const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const { uploadFile } = require('../controllers/uploadscontrollers');

// Endpoint to handle file uploads
router.post('/upload', authenticate, uploadFile);

// Endpoint to fetch user-specific uploads
router.get('/uploads', authenticate, async (req, res) => {
  const userId = req.user._id;
  const uploads = await Upload.find({ userId });
  res.json(uploads);
});

module.exports = router;
