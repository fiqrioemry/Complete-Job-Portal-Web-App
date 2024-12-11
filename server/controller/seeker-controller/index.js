const SeekerProfile = require("../../model/SeekerProfile");

// Get SeekerProfile
async function getSeekerProfile(req, res) {
  try {
    const { userId } = req.user;

    const seekerProfile = await SeekerProfile.findOne({ userId });

    if (!seekerProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Seeker profile not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Profile retrieved successfully.",
      data: seekerProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
}

// Update SeekerProfile
async function updateSeekerProfile(req, res) {
  try {
    const {
      userId,
      firstname,
      lastname,
      gender,
      birthday,
      phone,
      address,
      skills,
      resumeUrl,
    } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    const seekerProfile = await SeekerProfile.findOne({ userId });

    if (!seekerProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Seeker profile not found." });
    }

    // Update profile fields
    if (firstname) seekerProfile.firstname = firstname;
    if (lastname) seekerProfile.lastname = lastname;
    if (gender) seekerProfile.gender = gender;
    if (birthday) seekerProfile.birthday = birthday;
    if (phone) seekerProfile.phone = phone;
    if (address) seekerProfile.address = address;
    if (skills) seekerProfile.skills = skills;
    if (resumeUrl) seekerProfile.resumeUrl = resumeUrl;

    await seekerProfile.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: seekerProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
}

// Add Experience to SeekerProfile
async function addSeekerExperience(req, res) {
  try {
    const { userId, company, position, startDate, endDate, description } =
      req.body;

    // Validate required fields
    if (!userId || !company || !position) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing." });
    }

    // Find the seeker profile by userId
    const seekerProfile = await SeekerProfile.findOne({ userId });

    if (!seekerProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Seeker profile not found." });
    }

    // Add the new experience to the experience array
    seekerProfile.experience.push({
      company,
      position,
      startDate,
      endDate,
      description,
    });
    await seekerProfile.save();

    return res.status(200).json({
      success: true,
      message: "Experience added successfully.",
      data: seekerProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
}

// Update an Experience in SeekerProfile
async function updateSeekerExperience(req, res) {
  try {
    const {
      userId,
      experienceId,
      company,
      position,
      startDate,
      endDate,
      description,
    } = req.body;

    if (!userId || !experienceId) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing." });
    }

    const seekerProfile = await SeekerProfile.findOne({ userId });

    if (!seekerProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Seeker profile not found." });
    }

    const experience = seekerProfile.experience.id(experienceId);

    if (!experience) {
      return res
        .status(404)
        .json({ success: false, message: "Experience not found." });
    }

    // Update experience fields
    if (company) experience.company = company;
    if (position) experience.position = position;
    if (startDate) experience.startDate = startDate;
    if (endDate) experience.endDate = endDate;
    if (description) experience.description = description;

    await seekerProfile.save();

    return res.status(200).json({
      success: true,
      message: "Experience updated successfully.",
      data: seekerProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
}

module.exports = {
  getSeekerProfile,
  updateSeekerProfile,
  addSeekerExperience,
  updateSeekerExperience,
};