const userModel = require("../models/userModel");
const doctorModel = require("../models/doctorModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    return res.status(200).send({
      message: "All Users",
      success: true,
      data: users,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Error while fetching Users",
      success: false,
      err,
    });
  }
};

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find();
    return res.status(200).send({
      message: "All Doctors",
      success: true,
      data: doctors,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Error while fetching Doctors",
      success: false,
      err,
    });
  }
};

exports.changeDoctorStatus = async (req, res) => {
  try {
    const doctorId = req.body.record._id;
    const status = req.body.status;
    const userId = req.body.record.userId;
    const doctor = await doctorModel.findByIdAndUpdate(
      { _id: doctorId },
      { status: status }
    );

    const user = await userModel.findById({ _id: userId });
    user.notification.push({
      type: "doctor-application-status",
      message: `Your Application Status for Doctor has been ${status}`,
      data: {
        doctorId: doctorId,
        doctorName: req.body.record.firstName + " " + req.body.record.lastName,
        onClickPath: "/",
      },
    });

    if (status == "Approved") {
      user.isDoctor = true;
    }
    await user.save();
    return res.status(200).send({
      message: "Your Application status has been changed",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Error while changeing the Doctor status",
      success: false,
      err,
    });
  }
};

// To Block the user

exports.blockUser = async (req, res) => {
  try {
    console.log("in block controller");
    const userId = req.body._id;
    const user = await userModel.findById({ _id: userId });
    user.isActive = false;
    await user.save();
    const allUsers = await userModel.find({ isActive: true });
    return res.status(200).send({
      message: "User is block",
      success: true,
      data: allUsers,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Something went wrong",
      success: false,
    });
  }
};
