const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeControllers');
const Middlewares = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({
  storage,
  limit:{
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: function(req, file, cb) {

    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files allowed"), false);
    }

    cb(null, true);
  }
});

router.post('/upload', Middlewares.authMiddleware, upload.single('resume'), resumeController.uploadResumeController);
router.get('/', Middlewares.authMiddleware, resumeController.getResumesController);
router.get('/:id', Middlewares.authMiddleware, resumeController.getResumeByIdController);
router.delete('/:id', Middlewares.authMiddleware, resumeController.deleteResumeController);

module.exports = router;