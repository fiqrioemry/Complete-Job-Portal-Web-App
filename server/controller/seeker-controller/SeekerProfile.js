const SeekerProfile = require("../../model/SeekerProfile");

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

// Get SeekerProfile
async function getSeekerProfile(req, res) {
  try {
    const { userId } = req.params;

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
