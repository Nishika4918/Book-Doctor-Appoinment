const express = require("express");
const router = express.Router();
const _dc = require("../controllers/doctorController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/getDoctorDetails", authMiddleware, _dc.getDoctorDetails);
router.post("/updateDoctorDetails", authMiddleware, _dc.updateDoctorDetails);
router.post("/getDoctorById", authMiddleware, _dc.getDoctorById);
router.post("/allDoctorAppoinments", authMiddleware, _dc.getAllAppoinments);
router.post(
  "/allConfirmAppoinments",
  authMiddleware,
  _dc.getConfirmAppoinments
);
router.post(
  "/changeAppoinmentStatus",
  authMiddleware,
  _dc.changeAppoinmentStatus
);
module.exports = router;
