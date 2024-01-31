const { create } = require("./filesupload.service");

module.exports = {
  fileUpload: (req, res) => {
    const body = req.body;
    
    // Check if base64 data is provided
    if (!body || !body.employee_id) {
      return res.status(400).json({ success: 0, message: "Emplopyee ID not provided" });
    }

    if (!body || !body.employee_attendance_id) {
      return res.status(400).json({ success: 0, message: "Employee attendance ID not provided" });
    }

    if (!body || !body.image || !body.filename) {
      return res.status(400).json({ success: 0, message: "No image data provided" });
    }

    // Decode base64 image data
    const base64Data = body.image.replace(/^data:image\/png;base64,/, "");

    require("fs").writeFile("uploads/" + body.filename, base64Data, "base64", function(err) {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Error saving the image",
        });
      }
      
      const fullUrl = req.protocol + "://" + req.get("host") + "/uploads/" + body.filename;
    
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
    });
  },
};
