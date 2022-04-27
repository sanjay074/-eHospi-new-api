const express = require("express");
const auth = require("../../middlewares/auth");
const router = express.Router();
const {
  addHospital,
  findHospital,
  findOne,
  hospitalForm,
  hospitalBedbooking,
  allfindBedbooking,
  allfindBedstatus,
  findBedstatus,
  findOneBedbooking 
} = require("../controllers/hospitalcontroller");
const { distanceCalculator } = require("../controllers/distance");
const { cpUpload } = require("../../middlewares/hospitalForm");
router.post("/addHospital", addHospital);
router.get("/findHospital", auth.verifyToken,findHospital);
router.get("/findHospitalOne/:id",auth.verifyToken,findOne);
router.post("/hospitalForm", auth.verifyToken, cpUpload, hospitalForm);
router.post("/distance", distanceCalculator);
router.post("/hospitalBedBooking",hospitalBedbooking);
router.get('/allfindBedbooking',allfindBedbooking);
router.get('/allfindBedstatus',allfindBedstatus);
router.get('/findBedstatus',findBedstatus);
router.get('/findOneBedbooking',findOneBedbooking)
module.exports=router; 