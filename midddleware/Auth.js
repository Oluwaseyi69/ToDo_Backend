const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/UserModel');

dotenv.config();


module.exports = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]
 

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const secret = process.env.JWT_SECRET;
    console.log(secret);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const {id} = decoded.user;
    console.log(id)
    const user =  await User.findById(id);
    console.log(user);

    if (!user) {
      return res.status(401).json({ message: 'Invalid tokenn' });
    }
    
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};