
const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Access token is missing'
    });
  }

  jwt.verify(token, 'cdmin', (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: 'Invalid or expired token'
      });
    }

    req.user = decoded;
    next();
  });
};

module.exports = { checkToken };
