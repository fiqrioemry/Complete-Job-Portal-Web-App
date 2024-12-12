const express = require("express");
const validation = require("../../middleware");
const seeker = require("../../controller/seeker-controller");
const router = express.Router();

// profile
router.get("/profile", validation.isAuthenticate, seeker.getSeekerProfile);
router.put(
  "/profile/update",
  validation.isAuthenticate,
  seeker.updateSeekerProfile
);

// experience
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

// education
router.post(
  "/education/add",
  validation.isAuthenticate,
  seeker.addSeekerEducation
);
router.put(
  "/education/update/:id",
  validation.isAuthenticate,
  seeker.updateSeekerEducation
);

// certification
// router.post(
//   "/experience/add",
//   validation.isAuthenticate,
//   seeker.addSeekerExperience
// );
// router.put(
//   "/experience/update/:id",
//   validation.isAuthenticate,
//   seeker.updateSeekerExperience
// );
module.exports = router;
