const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
//new
const {phoneLogin,verifyOTP,showProfile,createProfile,isAlreadyRegistered} = require('../controllers/phoneLogin');
router.get("/profile", auth.verifyToken, showProfile);
router.post("/login_with_phone", phoneLogin);
router.post("/verifyOTP", verifyOTP);
router.post("/register_with_phone", auth.verifyToken, createProfile);
router.get("/profile", auth.verifyToken, showProfile);
router.get("/isAlreadyRegistered",auth.verifyToken,isAlreadyRegistered)
module.exports=router; 