const userService = require('../services/UserService')



exports.register = async (req, res) => {
  console.log("i go to controller first")
  console.log("Register endpoint hit");

  try {
    const userData = req.body;
    const userResponse = await userService.register(userData, userData);

    console.log(userData.email);

    res.status(201).json({ message: 'User created successfully', userResponse });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  console.log("Login endpoint hit");
  const { email, password } = req.body;

  try {
    const loginResponse = await userService.login(email, password);
    res.json(loginResponse);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
};