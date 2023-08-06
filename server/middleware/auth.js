const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.substring('Bearer '.length);
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
      const decoded = jwt.verify(token, 'your_secret_key_here');
      req.user = decoded.userId; // Attach the user ID to the request
      next();
    } catch (err) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  } else {
    // Authorization header is missing or doesn't start with 'Bearer '
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;