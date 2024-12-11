const express = require("express");
const validation = require("../../middleware");
const seeker = require("../../controller/seeker-controller");
const router = express.Router();

router.get("/profile", validation.isAuthenticate, seeker.getSeekerProfile);
router.put(
  "/profile/update",
  validation.isAuthenticate,
  seeker.updateSeekerProfile
);
router.post(
  "/experience/add",
  validation.isAuthenticate,
  seeker.addSeekerExperience
);
router.put(
  "/experience/update/:id",
  validation.isAuthenticate,
  seeker.updateSeekerExperience
);

module.exports = router;
