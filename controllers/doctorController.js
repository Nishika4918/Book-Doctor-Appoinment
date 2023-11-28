const doctorModel = require("./../models/doctorModel");
const appoinmentModel = require("./../models/appoinmentModel");
const userModel = require("./../models/userModel");

exports.getDoctorDetails = async (req, res) => {
  try {
    const userId = req.body.userId;
    const doctor = await doctorModel.findOne({ userId: userId });
    return res.status(200).send({
      message: "Doctor details are fetched",
      success: true,
      data: doctor,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Error while fetching the doctor details",
      success: false,
      err,
    });
  }
};

exports.updateDoctorDetails = async (req, res) => {
  try {
    console.log("in doctor update");
    const doctorUserId = req.body.userId;
    const doctor = await doctorModel.findOne({ userId: doctorUserId });
    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      doctor._id,
      req.body
    );
    return res.status(200).send({
      message: "Details Updated",
      success: true,
      data: updatedDoctor,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Error while updating the doctor details",
      success: false,
      err,
    });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    return res.status(200).send({
      message: "Doctor info send",
      success: true,
      data: doctor,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Error while getting Doctor by Id",
      success: false,
      err,
    });
  }
};

exports.getAllAppoinments = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const appoinments = await appoinmentModel.find({
      doctorId: doctor._id,
      status: "pending",
    });

    const confirmAppoinments = await appoinmentModel.find({
      doctorId: doctor._id,
      status: "approved",
    });

    return res.status(200).send({
      message: "All Appoinments are fetched",
      success: true,
      data: appoinments,
      confirmAppoinments: confirmAppoinments,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Error while getting Appoinments",
      success: false,
      err,
    });
  }
};

exports.changeAppoinmentStatus = async (req, res) => {
  try {
    const record = req.body.record;
    const status = req.body.status;
    console.log(record);
    const appoinment = await appoinmentModel.findByIdAndUpdate(
      { _id: record._id },
      { status: status }
    );

    const user = await userModel.findById({ _id: record.userId });
    user.notification.push({
      type: "appoinment-application-status",
      message: `Your Appoinment Status has been ${status}`,
    });
    await user.save();
    const appoinments = await appoinmentModel.find({
      doctorId: record.doctorId,
      status: "pending",
    });
    const confirmAppoinments = await appoinmentModel.find({
      doctorId: record.doctorId,
      status: "approved",
    });
    console.log(confirmAppoinments);

    return res.status(200).send({
      message: "Your Appoinment status has been changed",
      success: true,
      data: appoinments,
      confirmAppoinments: confirmAppoinments,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Error while changeing the  status",
      success: false,
      err,
    });
  }
};

exports.getConfirmAppoinments = async (req, res) => {
  try {
    console.log("In confirm controller");
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const confirmAppoinments = await appoinmentModel.find({
      doctorId: doctor._id,
      status: "approved",
    });
    return res.status(200).send({
      message: "All Appoinments are fetched",
      success: true,
      data: confirmAppoinments,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Something went wrong",
      success: false,
      err,
    });
  }
};
