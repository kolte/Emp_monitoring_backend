const userService = require('./login.service');
const jwt = require('jsonwebtoken');

module.exports = {
  login: async (req, res) => {
    try {
      
      const { username, password } = req.body;      
      if (!username || !password) {
        return res.status(400).json({ success: 0, message: 'Username and password are required' });
      }      
      const user = await userService.getUserByUsername(username);           
      if (!user) {
        return res.status(404).json({ success: 0, message: 'User not found' });
      }
      const validPassword = await userService.validatePassword(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ success: 0, message: 'Invalid password' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.secretkey, { expiresIn: '1h' }); // Adjust secret and expiration
      return res.status(200).json({ success: 1, token });

    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ success: 0, message: 'Internal server error' });
    }
  },

  authenticate: (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Assuming token is in Authorization header
    if (!token) {
      return res.status(401).json({ success: 0, message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, process.env.secretkey, (err, decoded) => {    
      if (err) {
        // Log the detailed error for debugging
        console.error('JWT Verification Error:', err);
    
        // Return a more informative error response
        return res.status(401).json({
          success: 0,
          message: `Unauthorized: Invalid token. ${err.message}`, // Include the error message
        });
      }
      return res.status(401).json({ success: 1, message:'Authorized successfully', user: decoded });
      
    });
    
  }
};
