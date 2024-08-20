const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();



exports.authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET,  { algorithms: ['HS256'] });
    req.user = decoded; // Assumes the decoded token contains the user ID
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
