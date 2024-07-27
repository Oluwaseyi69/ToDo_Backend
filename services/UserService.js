const User = require('../model/UserModel')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')


dotenv.config();

const register = async (req, res) => {
  console.log("i got to service first ")
  console.log("i got to register")
  // console.log(res);
  const { email, username, password, phoneNumber} = req.body;

  // if(password.length < 4){
  //   return res.status(400).json({message: 'Password must be atleast 4 characters long'})
  // }

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
      createdAt: new Date()
    };


    res.status(201).json({ message: 'User created successfully', userResponse });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


const login = async (req, res) => {

  // if (!req.body.email || !req.body.password) {
  //   return res.status(400).json({ message: 'Invalid request body' });
  // }  
  try {
    

    const { email, password } = req.body;
    console.log(email)
    
    let user;

    if (email) {
      user = await User.findOne({ email });
    } else if (email) {
      user = await User.findOne({ email });
    }
    console.log("verified", email)
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // const isMatch = await user.matchPassword(password);
    // if (!isMatch) {
    //   return res.status(400).json({ message: 'Invalid credentials' });
    // }

    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ message: 'Login Successful', token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


module.exports = {
  register,
  login
}


