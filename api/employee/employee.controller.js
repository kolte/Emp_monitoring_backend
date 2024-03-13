const { create, getUsers, updateUser, deleteUser, updateProfilePicture, getProfilePictureById } = require("./employee.service");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    create(body, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: 0,
          message: err.message || 'Database operation error',
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: 'Database operation error',
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  updateUserDetails: (req, res) => {
    const body = req.body;
    const userId = req.params.id;

    updateUser(userId, body, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: 0,
          message: err.message || 'Database operation error',
        });
      }
      return res.status(200).json({
        success: 1,
        message: 'Employee details updated successfully',
        data: results,
      });
    });
  },
  deleteUser: (req, res) => {
    const userId = req.params.id;

    deleteUser(userId, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: 0,
          message: err.message || 'Database operation error',
        });
      }
      return res.status(200).json({
        success: 1,
        message: 'Employee deleted successfully',
        data: results,
      });
    });
  },
  updateProfilePicture: (req, res) => {
    const userId = req.params.id;
    const profilePicture = req.body.profile_picture; // Assuming the base64 encoded image data is sent in the request body
  
    if (!profilePicture) {
      return res.status(400).json({
        success: 0,
        message: 'Profile picture data is required',
      });
    }
  
    updateProfilePicture(userId, profilePicture, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: 0,
          message: err.message || 'Database operation error',
        });
      }
      return res.status(200).json({
        success: 1,
        message: 'Profile picture updated successfully',
        data: results,
      });
    });
  },
  getProfilePicture: (req, res) => {
    const employeeId = req.params.id;
    getProfilePictureById(employeeId, (error, profilePicture) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({
                success: 0,
                message: error.message || 'Error fetching profile picture',
            });
        }
        if (!profilePicture) {
            return res.status(404).json({
                success: 0,
                message: 'Profile picture not found',
            });
        }
        // Send the profile picture as a response
        return res.status(200).send(profilePicture);
    });
}

  
};
