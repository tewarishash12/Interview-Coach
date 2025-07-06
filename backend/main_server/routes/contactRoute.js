const router = require("express").Router();
const { submitFeedback } = require("../controllers/contactController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/fileUpload")

router.post("/feedback", authMiddleware, upload.array("attachments", 5), submitFeedback);

module.exports = router;