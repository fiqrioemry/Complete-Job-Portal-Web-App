const User = require("../../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Token = require("../../model/Token");
dotenv.config();

// user signup : registration
async function userSignUp(req, res) {
  try {
    const { email, password, passwordConfirm, role } = req.body;

    // check field empty
    if (!email || !password || !passwordConfirm)
      return res
        .status(401)
        .send({ success: false, message: "All field required" });

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
    await User.create({
      email,
      password: hashPassword,
      role: role || "jobseeker",
    });

    // send success info
    return res
      .status(201)
      .send({ message: "Registration success, please login." });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

// user signin : Login
async function userSignIn(req, res) {
  try {
    const { email, password } = req.body;

    // check field empty
    if (!email || !password)
      return res
        .status(401)
        .send({ success: false, message: "All field required" });

    // check email existance
    const isUserExist = await User.findOne({ email });

    if (!isUserExist)
      return res
        .status(401)
        .send({ success: false, message: "Email is not registered" });

    // compare password
    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserExist.password
    );

    if (!isPasswordMatch)
      return res
        .status(401)
        .send({ success: false, message: "Password is wrong" });

    // assign user data
    const userId = isUserExist._id;
    const userEmail = isUserExist.email;
    const userRole = isUserExist.role;

    // generate data to token
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

    // check token
    const tokenData = await Token.findOne({ userId });

    if (tokenData) {
      await Token.update({ refreshToken });
    } else {
      await Token.create({ userId, refreshToken });
    }

    // set token as cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 30 * 60 * 60 * 1000,
    });

    // send success status
    return res.status(200).send({
      message: "Login is success",
      data: {
        accessToken: accessToken,
        user: {
          userId,
          userEmail,
          userRole,
        },
      },
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

async function userSignOut(req, res) {
  delete req.headers.authorization;

  res.clearCookie("refreshToken");

  return res.status(200).send({
    message: "Logout is Success",
    success: true,
  });
}

async function userRefreshToken(req, res) {
  try {
    const { userId } = req.user;
  } catch (error) {}
}

module.exports = { userSignUp, userSignIn, userSignOut };
