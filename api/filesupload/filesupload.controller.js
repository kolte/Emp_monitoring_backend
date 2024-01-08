const { create } = require("./filesupload.service");

module.exports = {
  fileUpload: (req, res) => {
    const body = req.body;
    create(body, (err, results) => {
      // if (err) {
      //   return res.status(500).json({
      //     success: 0,
      //     message: "Database connection error",
      //   });
      // }
      // return res.status(200).json({
      //   success: 1,
      //   data: results,
      // });
    });
  },
 
};
