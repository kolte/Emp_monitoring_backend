const router = require("express").Router();
const { fileUpload } = require("./filesupload.controller");
var multer = require("multer");

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
router.post("/", upload.single("image"), function (req, res, next) {
  try {
    return res.status(200).json({ message: "File uploaded successfully!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;
