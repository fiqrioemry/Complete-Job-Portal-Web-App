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
    const { userId } = req.user;
    const {
      firstname,
      lastname,
      gender,
      birthday,
      phone,
      bio,
      address,
      skills,
      resumeUrl,
    } = req.body;

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
    if (bio) seekerProfile.bio = bio;
    if (resumeUrl) seekerProfile.resumeUrl = resumeUrl;
    if (skills) {
      if (Array.isArray(skills)) {
        seekerProfile.skills.push(...skills);
      } else {
        seekerProfile.skills.push(skills);
      }
    }

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
    const { userId } = req.user;
    const { company, position, startDate, endDate, description } = req.body;

    // Validate required fields
    if (!company || !position || !startDate || !endDate) {
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
      userId,
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
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
}

// Update Experience in SeekerProfile
async function updateSeekerExperience(req, res) {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    const { company, position, startDate, endDate, description } = req.body;

    // Validate required fields
    if (!company || !position || !startDate || !endDate) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing." });
    }

    // add key finder
    const filter = {
      userId: userId,
      "experience._id": id,
    };

    // assign update value
    const update = {
      $set: {
        "experience.$.company": company,
        "experience.$.position": position,
        "experience.$.startDate": startDate,
        "experience.$.endDate": endDate,
        "experience.$.description": description,
      },
    };

    // Update experience
    const seekerProfile = await SeekerProfile.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (!seekerProfile) {
      return res.status(404).json({
        success: false,
        message: "Experience not found.",
      });
    }
    // send response and updated data
    return res.status(200).json({
      success: true,
      message: "Experience updated successfully.",
      updatedData: seekerProfile.experience.id(id),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
}

// Add Education to SeekerProfile
async function addSeekerEducation(req, res) {
  try {
    const { userId } = req.user;
    const { institution, fieldOfStudy, startDate, endDate } = req.body;

    // Validate required fields
    if (!institution || !fieldOfStudy || !startDate || !endDate) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing." });
    }

    // Find  seeker profile by userId
    const seekerProfile = await SeekerProfile.findOne({ userId });

    if (!seekerProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Seeker profile not found." });
    }

    // push education data
    seekerProfile.education.push({
      userId,
      institution,
      fieldOfStudy,
      startDate,
      endDate,
    });
    await seekerProfile.save();

    return res.status(200).json({
      success: true,
      message: "Education added successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
}

//Update Education in SeekerProfile
async function updateSeekerEducation(req, res) {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const { institution, fieldOfStudy, startDate, endDate } = req.body;

    // Validate required fields
    if (!institution || !fieldOfStudy || !startDate || !endDate) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing." });
    }

    // add key finder
    const filter = {
      userId,
      "education._id": id,
    };

    // add update data
    const update = {
      $set: {
        "education.$.insitution": institution,
        "education.$.fieldOfStudy": fieldOfStudy,
        "education.$.startDate": startDate,
        "education.$.endDate": endDate,
      },
    };
    // find and update
    const seekerProfile = await SeekerProfile.findOne(
      { userId, "education._id": mongoose.Types.ObjectId(id) },
      { "education.$": 1 } // Hanya mengambil elemen yang cocok dari array education
    );

    console.log(seekerProfile);

    if (!seekerProfile) {
      return res.status(404).json({
        success: false,
        message: "Education not found.",
      });
    }

    console.log(seekerProfile);
    // send response and updated data
    return res.status(200).json({
      success: true,
      message: "Education updated successfully.",
      updatedData: seekerProfile,
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
  addSeekerEducation,
  updateSeekerEducation,
};
