const Seeker = require("../../model/Seeker");

// Get SeekerProfile
async function getSeekerProfile(req, res) {
  try {
    const { userId } = req.user;

    const seekerData = await Seeker.findOne({ userId });

    if (!seekerData) {
      return res
        .status(404)
        .json({ success: false, message: "Seeker profile not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Profile retrieved successfully.",
      data: seekerData,
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

    const seekerData = await Seeker.findOne({ userId });

    if (!seekerData) {
      return res
        .status(404)
        .json({ success: false, message: "Seeker profile not found." });
    }

    // Update profile fields
    if (firstname) seekerData.firstname = firstname;
    if (lastname) seekerData.lastname = lastname;
    if (gender) seekerData.gender = gender;
    if (birthday) seekerData.birthday = birthday;
    if (phone) seekerData.phone = phone;
    if (address) seekerData.address = address;
    if (bio) seekerData.bio = bio;
    if (resumeUrl) seekerData.resumeUrl = resumeUrl;
    if (skills) {
      if (Array.isArray(skills)) {
        seekerData.skills.push(...skills);
      } else {
        seekerData.skills.push(skills);
      }
    }

    await seekerData.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: seekerData,
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
    const seeker = await Seeker.findOne({ userId });

    if (!seeker) {
      return res
        .status(404)
        .json({ success: false, message: "Seeker profile not found." });
    }

    // Add the new experience to the experience array
    seeker.experience.push({
      userId,
      company,
      position,
      startDate,
      endDate,
      description,
    });
    await seeker.save();

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

    // check experience data validity
    const seekerData = await Seeker.findOne({
      userId,
    });
    const experienceData = seekerData.experience.id(id);

    if (!experienceData) {
      return res.status(404).json({
        success: false,
        message: "experience not found.",
      });
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
    const seekerNewData = await Seeker.findOneAndUpdate(filter, update, {
      new: true,
    });

    // send response and updated data
    return res.status(200).json({
      success: true,
      message: "Experience updated successfully.",
      updatedData: seekerNewData.experience.id(id),
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
    const seekerData = await Seeker.findOne({ userId });

    if (!seekerData) {
      return res
        .status(404)
        .json({ success: false, message: "Seeker profile not found." });
    }

    // push education data
    seekerData.education.push({
      userId,
      institution,
      fieldOfStudy,
      startDate,
      endDate,
    });
    await seekerData.save();

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

    // check education data validity
    const seekerData = await Seeker.findOne({
      userId,
    });

    const educationData = seekerData.education.id(id);

    if (!educationCheck) {
      return res.status(404).json({
        success: false,
        message: "Education not found.",
      });
    }

    // add key finder
    const filter = {
      userId: userId,
      "education._id": id,
    };

    // assign update value
    const update = {
      $set: {
        "education.$.institution": institution,
        "education.$.fieldOfStudy": fieldOfStudy,
        "education.$.startDate": startDate,
        "education.$.endDate": endDate,
      },
    };

    // Update experience
    const seekerNewData = await Seeker.findOneAndUpdate(filter, update, {
      new: true,
    });

    // send response and updated data
    return res.status(200).json({
      success: true,
      message: "Education updated successfully.",
      updatedData: seekerNewData.education.id(id),
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
async function addSeekerCertification(req, res) {
  try {
    const { userId } = req.user;
    const { name, issuedBy, issuedDate, credentialId } = req.body;

    // Validate required fields
    if (!name || !issuedBy || !issuedDate || !credentialId) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing." });
    }

    // Find  seeker profile by userId
    const seekerData = await Seeker.findOne({ userId });

    if (!seekerData) {
      return res
        .status(404)
        .json({ success: false, message: "Seeker profile not found." });
    }

    // push certification data
    seekerData.certification.push({
      userId,
      name,
      issuedBy,
      issuedDate,
      credentialId,
    });
    await seekerData.save();

    return res.status(200).json({
      success: true,
      message: "certification added successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
}

//Update certification in SeekerProfile
async function updateSeekerCertification(req, res) {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const { name, issuedBy, issuedDate, credentialId } = req.body;

    // Validate required fields
    if (!name || !issuedBy || !issuedDate || !credentialId) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing." });
    }

    // check certification data validity
    const seekerData = await Seeker.findOne({
      userId,
    });

    const certificationData = seekerData.certification.id(id);

    if (!certificationData) {
      return res.status(404).json({
        success: false,
        message: "certification not found.",
      });
    }

    // add key finder
    const filter = {
      userId: userId,
      "certification._id": id,
    };

    // assign update value
    const update = {
      $set: {
        "certification.$.name": name,
        "certification.$.issuedBy": issuedBy,
        "certification.$.issuedDate": issuedDate,
        "certification.$.credetialId": credentialId,
      },
    };

    // Update experience
    const seekerNewData = await Seeker.findOneAndUpdate(filter, update, {
      new: true,
    });

    // send response and updated data
    return res.status(200).json({
      success: true,
      message: "certification updated successfully.",
      updatedData: seekerNewData.certification.id(id),
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
  addSeekerCertification,
  updateSeekerCertification,
};
