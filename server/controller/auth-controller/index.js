const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../../model/User");
const Token = require("../../model/Token");
const Seeker = require("../../model/Seeker");
dotenv.config();

// user signup : registration
async function seekerSignUp(req, res) {
  try {
    const {
      email,
      password,
      passwordConfirm,
      firstname,
      lastname,
      phone,
      location,
    } = req.body;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    // check email existance
    const isEmailExist = await User.findOne({ email });

    if (isEmailExist)
      return res
        .status(401)
        .send({ success: false, message: "Email is already registered" });

    // encrypt password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    // save user
    const newUser = await User.create({
      email,
      password: hashPassword,
      role: "job seeker",
    });

    // save user
    await Seeker.create({
      userId: newUser._id,
      firstname,
      lastname,
      location,
      phone,
    });

    // send success info
    return res
      .status(201)
      .send({ message: "Registration success, please login." });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

// user signup : registration
async function recruiterSignUp(req, res) {
  try {
    const {
      email,
      password,
      passwordConfirm,
      firstname,
      lastname,
      phone,
      location,
    } = req.body;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    // check email existance
    const isEmailExist = await User.findOne({ email });

    if (isEmailExist)
      return res
        .status(401)
        .send({ success: false, message: "Email is already registered" });

    // encrypt password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    // save user
    const newUser = await User.create({
      email,
      password: hashPassword,
      role: role || "jobseeker",
    });

    // save user
    await Seeker.create({
      userId: newUser._id,
      firstname,
      lastname,
      location,
      phone,
    });

    // send success info
    return res
      .status(201)
      .send({ message: "Registration success, please login." });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

// User signin: Login
async function userSignIn(req, res) {
  try {
    const { email, password } = req.body;

    // Check if both fields are provided
    if (!email || !password)
      return res
        .status(401)
        .send({ success: false, message: "All fields are required" });

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if the user exists
    const isUserExist = await User.findOne({ email });

    if (!isUserExist)
      return res
        .status(401)
        .send({ success: false, message: "Email is not registered" });

    // Compare the password
    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserExist.password
    );

    if (!isPasswordMatch)
      return res
        .status(401)
        .send({ success: false, message: "Password is incorrect" });

    const profile = await Seeker.findOne({ userId: isUserExist._id });

    // Extract user data
    const userId = isUserExist._id;
    const userEmail = isUserExist.email;
    const userRole = isUserExist.role;
    const userName = profile.firstname + " " + profile.lastname;

    // Generate access and refresh tokens
    const accessToken = jwt.sign(
      { userId, userEmail, userRole },
      process.env.ACCESS_TOKEN,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId, userEmail, userRole },
      process.env.REFRESH_TOKEN,
      { expiresIn: "30d" }
    );

    // Save or update the refresh token in the Token collection
    const tokenData = await Token.findOne({ userId });
    if (tokenData) {
      await Token.updateOne({ userId }, { refreshToken });
    } else {
      await Token.create({ userId, refreshToken });
    }

    // Set the refresh token as cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 30 * 60 * 60 * 1000, // 30 days
    });

    // Send response with success status and token
    return res.status(200).send({
      message: "Login is success",
      data: {
        accessToken,
        user: {
          userId,
          userEmail,
          userRole,
          userName,
        },
      },
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

// User signout: Logout
async function userSignOut(req, res) {
  res.clearCookie("refreshToken");
  return res.status(200).send({
    message: "Logout is success",
    success: true,
  });
}

// user refresh token
async function userRefreshToken(req, res) {
  try {
    const { refreshToken } = req.cookies;

    // cek token availability
    if (!refreshToken)
      return res
        .status(401)
        .send({ success: false, message: "Session expired, please login " });

    // cek token validity
    const validToken = await Token.findOne({ refreshToken });

    if (!validToken) {
      return res.status(401).send({ message: "Unauthorized Access !!!" });
    }

    // decode userdata
    const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);

    // assign user data
    const payload = {
      userId: decode.userId,
      userEmail: decode.userEmail,
      userRole: decode.userRole,
      userName: decode.userName,
    };

    // generate new accesstoken
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
      expiresIn: "30d",
    });

    return res.status(201).send({ success: true, accessToken: accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error.message });
  }
}

module.exports = { userSignUp, userSignIn, userSignOut, userRefreshToken };
