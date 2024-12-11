const express = require("express");
const authController = require("../../controller/auth-controller");
const router = express.Router();

router.post("/signup", authController.userSignUp);
router.post("/signin", authController.userSignIn);
router.post("/signout", authController.userSignOut);

module.exports = router;
