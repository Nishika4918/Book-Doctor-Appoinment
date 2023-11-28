const userModel = require("../models/userModel");
const appoinmentModel = require("../models/appoinmentModel");
const doctorModel = require("../models/doctorModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const moment = require("moment");
const path = require("path");
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "nishikathakur4918@gmail.com",
    pass: "ahjnlghhzwwfetlt",
  },
});
const fs = require("fs");

exports.postRegister = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User already exits", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    req.body.password = hashPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    return res
      .status(200)
      .send({ message: "User Register Sucessfully", success: true });
  } catch (err) {
    return res.status(500).send({
      message: `Error in User Registration ${err.message}`,
      success: false,
    });
  }
};

exports.postLogin = async (req, res) => {
  try {
    console.log("In login controller");
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User not exist", success: false });
    }
    const password = await bcrypt.compare(req.body.password, user.password);
    if (!password) {
      return res
        .status(200)
        .send({ message: "Invalid Email or Password", success: false });
    }
    if (user.isActive == false) {
      return res
        .status(200)
        .send({ message: "User is not Active", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .send({ message: "Login Successfully", success: true, token, user });
  } catch (err) {
    return res.status(500).send({
      message: `Error in User Login ${err.message}`,
      success: false,
    });
  }
};

exports.getUserData = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "USER NOT FOUND", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: "Auth Error",
      success: false,
      err,
    });
  }
};

// EX
// User forget password

exports.userForgetPassword = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "Can't find User with Email", success: false });
    } else {
      transport.sendMail({
        to: user.email,
        subject: `Reset Password Link`,
        html: `<h6>Your Reset Password Link is given below<br /><a href="http://localhost:3000/resetPassword/${user._id}">Reset Password</a></h6>`,
      });
      return res
        .status(200)
        .send({ message: "Link is send to your Email", success: true });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "error",
      success: false,
      err,
    });
  }
};

exports.postResetPassword = async (req, res) => {
  try {
    console.log("in reset password controller");
    const user = await userModel.findById({ _id: req.body.userId });
    const password = req.body.values.password;
    console.log(password);
    console.log(user);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    user.password = hashPassword;
    await user.save();
    return res.status(200).send({
      message: "Password Reset successful",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Something went wrong",
      success: false,
    });
  }
};

exports.postDoctorDetail = async (req, res) => {
  try {
    const newDoctor = await new doctorModel(req.body);
    const existingDoctor = await doctorModel.findOne({
      userId: req.body.userId,
    });
    if (existingDoctor) {
      return res.status(200).send({
        message: "Already Applied for Doctor, Check Status",
        success: false,
      });
    } else {
      await newDoctor.save();

      const adminUser = await userModel.findOne({ isAdmin: true });
      const notification = adminUser.notification;
      notification.push({
        type: "user-doctor-applied",
        message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for Doctor Role`,
        data: {
          doctorId: newDoctor._id,
          doctorName: newDoctor.firstName + " " + newDoctor.lastName,
          onClickPath: "/admin/doctors",
        },
      });

      await userModel.findByIdAndUpdate(adminUser._id, { notification });

      return res
        .status(200)
        .send({ message: "Doctor Applied Successfully", success: true });
    }
  } catch (err) {
    return res.status(500).send({
      message: "Can't post the doctor details",
      success: false,
      err,
    });
  }
};

exports.getAllNotification = async (req, res) => {
  try {
    console.log("In Nottification Controller");
    const user = await userModel.findOne({ _id: req.body.userId });
    const notification = user.notification;
    const seeNotification = user.seeNotification;
    console.log(notification);
    console.log(seeNotification);
    seeNotification.push(...notification);
    user.notification = [];
    user.seeNotification = notification;
    const updatedUser = await user.save();
    return res.status(200).send({
      message: "All Notification is Mark as Read",
      data: updatedUser,
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Error while getting the Notification",
      success: false,
      err,
    });
  }
};

exports.deleteAllNotification = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seeNotification = [];
    const updatedUser = await user.save();
    return res.status(200).send({
      message: "All Notification is Deleted",
      data: updatedUser,
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Error while Deleting the Notification",
      success: false,
      err,
    });
  }
};

exports.getAllDoctors = async (req, res) => {
  try {
    const userId = req.body.userId;
    const blockedUsers = await userModel.find({ isActive: false });
    const blockedUserIds = blockedUsers.map((user) => user._id.valueOf());
    console.log(blockedUserIds);

    const doctors = await doctorModel.find({
      $and: [{ userId: { $ne: userId } }, { status: "Approved" }],
    });
    return res.status(200).send({
      message: "Doctors Details",
      data: doctors,
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Error while Fetching the doctors",
      success: false,
      err,
    });
  }
};

exports.bookDoctorAppoinment = async (req, res) => {
  try {
    console.log("In book doctor appointment controller");
    const udate = new Date(req.body.date);
    req.body.date = udate.toISOString();
    const startTime = moment(req.body.startTime, "HH:mm");
    const endTime = startTime.clone().add(1, "hour");
    const formattedEndTime = endTime.format("HH:mm");
    const appoinment = new appoinmentModel(req.body);
    appoinment.endTime = formattedEndTime;
    await appoinment.save();

    const doctorDetail = await userModel.findOne({
      _id: req.body.doctorInfo.userId,
    });
    console.log(doctorDetail);
    doctorDetail.notification.push({
      type: "New-appoinment-request",
      message: `A New Appoinment request from ${req.body.userInfo.user.name}`,
      onClickPath: "/user/appoinments",
    });
    await doctorDetail.save();
    return res.status(200).send({
      message: "Appoinment application is done",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Error during booking appoinment",
      success: false,
      err,
    });
  }
};

exports.checkAvailability = async (req, res) => {
  try {
    const selectedTime = req.body.time;
    console.log(req.body.date);
    const doctorId = req.body.doctorId;
    const newDate = new Date(req.body.date);
    const originalTime = moment(req.body.time, "HH:mm");
    const toTime = originalTime.clone().add(1, "hour");
    const formattedToTime = toTime.format("HH:mm");
    const fromTime = originalTime.clone().subtract(2, "minutes");
    const formattedFromTime = fromTime.format("HH:mm");

    const doctor = await doctorModel.findById({ _id: doctorId });

    const doctorStartTime = doctor.timing[0];
    const doctorEndTime = doctor.timing[1];
    if (selectedTime >= doctorStartTime && selectedTime < doctorEndTime) {
      const overlappingAppointments = await appoinmentModel.find({
        doctorId: doctorId,
        date: newDate.toISOString(),
        startTime: { $lte: formattedToTime }, // Check if startTime is before the new appointment's end time
        endTime: { $gt: formattedFromTime }, // Check if endTime is after the new appointment's start time
      });
      if (overlappingAppointments.length > 0) {
        return res.status(200).send({
          message: "Appointment is booked already",
          success: false,
        });
      } else {
        return res.status(200).send({
          message: "Doctor is available",
          success: true,
        });
      }
    } else {
      return res.status(200).send({
        message: "Enter a valid Time",
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: "Error while checking availability",
      success: false,
      err,
    });
  }
};

// USER APPOINMENTS
exports.getUserAppoinments = async (req, res) => {
  try {
    const appoinments = await appoinmentModel.find({ userId: req.body.userId });
    return res.status(200).send({
      message: "All Appoinments",
      success: true,
      data: appoinments,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Something went wrong!",
      success: false,
    });
  }
};

exports.uploadUserProfileImage = async (req, res) => {
  try {
    console.log("in profile controller");
    const userId = req.body.userId;
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
        success: false,
      });
    }
    const uploadedFile = req.file;
    const fileName = uploadedFile.filename;
    const user = await userModel.findOne({ _id: userId });
    user.profileImage = fileName;
    await user.save();

    return res.status(200).json({
      message: "Profile image uploaded successfully",
      success: true,
      data: fileName,
    });
  } catch (err) {
    console.error("Error uploading profile image:", err);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

exports.getMainPageData = async (req, res) => {
  try {
    console.log("in main page ");
  } catch (err) {
    return res.status(500).send({
      message: "something went wrong",
      success: false,
    });
  }
};
