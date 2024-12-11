const jwt = require("jsonwebtoken");

// user authentication
async function isAuthenticate(req, res, next) {
  // catch token from header
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ").pop();
  try {
    // check token validity
    if (!token)
      return res
        .status(401)
        .send({ success: false, message: "Session expired, please login" });

    // decode user data
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

    // assign data as req
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access !!!",
    });
  }
}

// admin authentication
async function isAdmin(req, res, next) {
  const { userRole } = req.user;

  //   check user role
  if (userRole !== "admin")
    return res.status(403).send({ message: "Access is Prohibited" });

  next();
}

module.exports = { isAuthenticate, isAdmin };
