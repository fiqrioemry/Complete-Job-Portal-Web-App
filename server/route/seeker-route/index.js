const express = require("express");
const validation = require("../../middleware");
const seeker = require("../../controller/seeker-controller/SeekerProfile");
const router = express.Router();

router.get("/profile", validation.isAuthenticate, seeker.getSeekerProfile);
router.post(
  "/profile/update",
  validation.isAuthenticate,
  seeker.updateSeekerProfile
);
router.post(
  "/experience/add",
  validation.isAuthenticate,
  seeker.addSeekerExperience
);
router.post(
  "/experience/update",
  validation.isAuthenticate,
  seeker.updateSeekerExperience
);

module.exports = router;
