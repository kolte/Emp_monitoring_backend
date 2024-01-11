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

      const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' }); // Adjust secret and expiration
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

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: 0, message: 'Unauthorized: Invalid token' });
      }
      req.userId = decoded.userId;
      next();
    });
  }
};
