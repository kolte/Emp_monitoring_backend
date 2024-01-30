const router = require("express").Router();
const { fileUpload } = require("./filesupload.controller");
const multer = require("multer");
const authenticate = require("./authenticate.middleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    var fileFormat = file.originalname.split(".");
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        fileFormat[fileFormat.length - 1]
    );
  },
});

const upload = multer({ storage: storage });

router.post("/", authenticate, upload.single("image"), fileUpload);

module.exports = router;
