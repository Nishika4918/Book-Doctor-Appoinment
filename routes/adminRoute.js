const express = require("express");
const router = express.Router();
const _ac = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/getAllUsers", authMiddleware, _ac.getAllUsers);
router.get("/getAllDoctors", authMiddleware, _ac.getAllDoctors);
router.post("/changeDoctorStatus", authMiddleware, _ac.changeDoctorStatus);
router.post("/blockuser", authMiddleware, _ac.blockUser);

module.exports = router;
