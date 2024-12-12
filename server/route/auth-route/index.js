const express = require("express");
const authController = require("../../controller/auth-controller");
const router = express.Router();

router.post("/seeker/signup", authController.seekerSignUp);
router.post("/recruiter/signup", authController.recruiterSignUp);
router.post("/signin", authController.userSignIn);
router.post("/signout", authController.userSignOut);
router.post("/refresh", authController.userRefreshToken);

module.exports = router;
