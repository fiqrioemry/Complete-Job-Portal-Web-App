const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../../model/User");
const Token = require("../../model/Token");
const Seeker = require("../../model/Seeker");
const Recruiter = require("../../model/Recruiter");
dotenv.config();

// seeker signup : registration
async function seekerSignUp(req, res) {
  try {
    const {
      email,
      password,
      passwordConfirm,
      firstName,
      lastName,
      phone,
      location,
    } = req.body;

    if (password !== passwordConfirm) {
      return res.status(400).json({ message: "Password did not match" });
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
      role: "jobseeker",
    });

    // save user
    await Seeker.create({
      userId: newUser._id,
      firstName,
      lastName,
      location,
      phone,
    });

    // send success info
    return res
      .status(201)
      .send({ message: "Registration success, please login." });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

// user signup : registration
async function recruiterSignUp(req, res) {
  try {
    const {
      email,
      password,
      passwordConfirm,
      companyName,
      firstName,
      lastName,
    } = req.body;

    if (password !== passwordConfirm) {
      return res.status(400).json({ message: "Password did not match" });
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
      role: "recruiter",
    });

    // save user
    await Recruiter.create({
      userId: newUser._id,
      companyName,
      firstName,
      lastName,
      phone,
    });

    // send success info
    return res
      .status(201)
      .send({ message: "Registration success, please login." });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

// User signin: Login
async function userSignIn(req, res) {
  try {
    const { email, password } = req.body;

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

    let profile = [];
    if (isUserExist.role === "jobseeker") {
      profile = await Seeker.findOne({ userId: isUserExist._id });
    } else {
      profile = await Recruiter.findOne({ userId: isUserExist._id });
    }

    const userId = isUserExist._id;
    const userEmail = isUserExist.email;
    const userRole = isUserExist.role;
    const userName = profile?.firstName + " " + profile?.lastName;

    // Generate access and refresh tokens
    const accessToken = jwt.sign(
      { userId, userEmail, userRole, userName },
      process.env.ACCESS_TOKEN,
      { expiresIn: "30d" }
    );

    const refreshToken = jwt.sign(
      { userId, userEmail, userRole, userName },
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
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
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

module.exports = {
  seekerSignUp,
  recruiterSignUp,
  userSignIn,
  userSignOut,
  userRefreshToken,
};
