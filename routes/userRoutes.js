const express = require("express");
const router = express.Router();
const _uc = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/login", _uc.postLogin);
router.post("/register", _uc.postRegister);
router.post("/forgetPassord", _uc.userForgetPassword);
router.post("/resetPassword", _uc.postResetPassword);
router.post("/getUserData", authMiddleware, _uc.getUserData);
router.post("/applydoctor", authMiddleware, _uc.postDoctorDetail);
router.post("/getAllNotification", authMiddleware, _uc.getAllNotification);
router.post(
  "/deleteAllNotification",
  authMiddleware,
  _uc.deleteAllNotification
);

router.post("/getAllDoctors", authMiddleware, _uc.getAllDoctors);
router.post("/book-appoinment", authMiddleware, _uc.bookDoctorAppoinment);
router.post("/checkAvailability", authMiddleware, _uc.checkAvailability);
router.post("/getUserAppoinments", authMiddleware, _uc.getUserAppoinments);

router.post("/uploadUserImage", authMiddleware, _uc.uploadUserProfileImage);

module.exports = router;
