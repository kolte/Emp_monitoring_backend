const userService = require("./login.service");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res
          .status(400)
          .json({ success: 0, message: "Username and password are required" });
      }
      const user = await userService.getUserByUsername(username);
      if (!user) {
        return res.status(404).json({ success: 0, message: "User not found" });
      }
      const validPassword = await userService.validatePassword(
        password,
        user.password
      );
      if (!validPassword) {
        return res
          .status(401)
          .json({ success: 0, message: "Invalid password" });
      }

      const token = jwt.sign({ userId: user.id }, process.env.secretkey, {
        expiresIn: "1d",
      }); // Adjust secret and expiration
      const refreshToken = jwt.sign(
        { userId: user.id },
        process.env.secretkey,
        {
          expiresIn: "7d",
        }
      );
      return res.status(200).json({
        success: 1,
        token,
        refreshToken,
        userId: user.userId,
        empID: user.employeeId,
        roleId: user.roleId,
        role_name: user.role_name,
      });
    } catch (error) {
      console.error("Login error:", error);
      return res
        .status(500)
        .json({ success: 0, message: "Internal server error" });
    }
  },

  authenticate: (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json({ success: 0, message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: 0, message: "Unauthorized: Invalid token" });
    }
    // const token = req.headers.authorization?.split(' ')[1]; // Assuming token is in

    jwt.verify(token, process.env.secretkey, (err, decoded) => {
      if (err) {
        // Log the detailed error for debugging
        console.error("JWT Verification Error:", err);

        // Return a more informative error response
        return res.status(401).json({
          success: 0,
          message: `Unauthorized: Invalid token. ${err.message}`, // Include the error message
        });
      }
      return res.status(401).json({
        success: 1,
        message: "Authorized successfully",
        user: decoded,
      });
    });
  },

  refreshToken: async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res
          .status(401)
          .json({ success: 0, message: "Unauthorized: No token provided" });
      }
      const { refreshToken } = req.body;
      if (!refreshToken)
        return res.status(401).json({
          success: 0,
          message: "Access Denied. No refresh token provided.",
        });

      jwt.verify(refreshToken, process.env.secretkey, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            success: 0,
            message: "Access Denied. ",
          });
        }
        const token = jwt.sign(
          { userId: decoded.userId },
          process.env.secretkey,
          {
            expiresIn: "10h",
          }
        ); // Adjust secret and expiration
        res.status(200).json({
          success: 1,
          token
        })
      });
    } catch (error) {
      console.error("Login error:", error);
      return res
        .status(500)
        .json({ success: 0, message: "Internal server error" });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { username, newPassword } = req.body;
      if (!username || !newPassword) {
        return res
          .status(400)
          .json({ success: 0, message: "Username and new password are required" });
      }
      // Call the reset password function from the service
      const result = await userService.resetPassword(username, newPassword);
      if (!result) {
        return res.status(404).json({ success: 0, message: "User not found" });
      }
      return res.status(200).json({
        success: 1,
        message: "Password reset successfully",
      });
    } catch (error) {
      console.error("Reset password error:", error);
      return res
        .status(500)
        .json({ success: 0, message: "Internal server error" });
    }
  },
};
