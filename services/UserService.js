const User = require('../model/UserModel')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs');


dotenv.config();

const register = async (req, res) => {
  console.log("i got to service first ")
  console.log("i got to register")
  const { email, username, password, phoneNumber} = req.body;


  if (!/^\+234\d{10}$/.test(phoneNumber)) {
    return res.status(400).json({ message: 'Phone number must start with +234 and be 10 digits long' });
  }

  try {
    let user = await User.findOne({ email });
    let userEmail = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    } else if (userEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    user = new User({

      email,
      username,
      password,
      phoneNumber
    });

    await user.save();
    const userResponse = {
      id: user._id,
      email: user.email,
      username: user.username,
      password: user.password,
      createdAt: new Date()
    };


    res.status(201).json({ message: 'User created successfully', userResponse });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


const login = async (req, res) => {

  console.log("Login endpoint hit");


  try {
    console.log("i got here")
    const { email, password } = req.body;

    console.log(email);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log("isMatch");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    console.log(password)

    console.log("i got to jwt")
    const token = jwt.sign(
      { userId: user._id, email: user.email }, 
      process.env.JWT_SECRET,                   
      { algorithm: 'HS256', expiresIn: '1h' }  
    );

    res.status(200).json({ 
      message: "Login Successfully",
      token });

  }catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  register,
  login
}


