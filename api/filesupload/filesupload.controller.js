const { create } = require("./filesupload.service");

module.exports = {
  fileUpload: (req, res) => {
    const body = req.body;
    if (!req.file) {
      return res.status(400).json({ success: 0, message: "No file uploaded" });
    }
    const fullUrl = req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;
    
    const data = {
      ...body,
      fullUrl: fullUrl,
    };

    create(data, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
};
