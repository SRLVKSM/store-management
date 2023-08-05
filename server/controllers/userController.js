// controllers/userController.js
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const cookie = require('cookie');

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, 'your_secret_key_here', { expiresIn: '1h' });

    res.setHeader('Set-Cookie', cookie.serialize('jwt', token, {
      httpOnly: true, // Prevents JavaScript access to the cookie
      maxAge: 3600000, // Expiry time in milliseconds (1 hour in this case)
      domain: 'localhost', // Set the domain to allow access from localhost and subdomains.localhost
      path: '/', // Set the path to '/' to allow access from the whole domain
    }));

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create and send a JWT token as a cookie
    const token = jwt.sign({ userId: user._id }, 'your_secret_key_here', { expiresIn: '1h' });

    res.cookie('jwt', token, {
      httpOnly: true, // Prevents JavaScript access to the cookie
      maxAge: 3600000, // Expiry time in milliseconds (1 hour in this case)
    });

    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to login', error: error.message });
  }
};
