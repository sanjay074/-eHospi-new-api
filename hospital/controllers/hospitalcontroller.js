const Joi = require("joi");
const hospital = require("../models/hospital");
const hospitalForm = require("../models/hospitalForm");
const hospitalBed = require("../models/hospitalBed");
const BedType = require('../models/bedType');
exports.findHospital = async (req, res) => {
  try {
    const HospitalFind = await hospital.find(
      {},
      { _id: 0, __v: 0 }
    );
    res.status(200).json(HospitalFind);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.findOne = async (req, res) => {
  try {
    const HospitalFind = await hospital.findById(req.params.id);
    res.status(200).json(HospitalFind);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.addHospital = async (req, res) => {
  const { body } = req;
  const hospitalSchema = Joi.object()
    .keys({
      hospitalName: Joi.string().required(),
      hospitalCode: Joi.string().required(),
      hospitalLocation: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      alldoctors: Joi.number().required(),
      allbeds: Joi.number().required(),
      ambulances: Joi.number().required(),
    })
    .required();
  let result = hospitalSchema.validate(body);
  if (result.error) {
    res.send("Please enter a valid details");
  } else {
    try {
      const hospitalDetails = new hospital(req.body);
      await hospitalDetails.save();
      res.status(201).send("Hospital registered sucessfully");
    } catch (err) {
      res.status(500).send("An error ocurred");
    }
  }
};
exports.hospitalForm = async (req, res) => {
  const { body } = req;
  
  const hospitalFormSchema = Joi.object().keys({
    bookingId: Joi.string(),
    bookingStatus: Joi.string().valid("pending"),
    hospitalCode: Joi.string().required(),
    patientName: Joi.string().required(),
    familyMember: Joi.string().required(),
    dob: Joi.date().less("now").greater("01-01-1920").required(),
    gender: Joi.string().valid("Male", "Female", "Other").required(),
    fatherHusbandName: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string()
      .regex(/^[6-9]{1}[0-9]{9}$/)
      .required(),
    email: Joi.string().email().required(),
    nationality: Joi.string().required(),
    religion: Joi.string().required(),
    monthlyIncome: Joi.number().required(),
    occupation: Joi.string().required(),
    altPhone: Joi.string()
      .regex(/^[6-9]{1}[0-9]{9}$/)
      .required(),
    doctorName: Joi.string().required(),
    policyNumber: Joi.string().required(),
    employerName: Joi.string().required(),
    employerId: Joi.string().required(),
  });
  let result = hospitalFormSchema.validate(body);
  if (result.error) {
    console.log(result)
    res.send("Please enter a valid details");
  } else {
    try {
      let p=bookID();
      console.log
      const addHospitalForm = new hospitalForm({
        bookingId: p,
        bookingStatus: "pending",
        bookedBy: req.user.uid,
        hospitalCode: req.body.hospitalCode,
        patientName: req.body.patientName,
        familyMember: req.body.familyMember,
        dob: req.body.dob,
        gender: req.body.gender,
        fatherHusbandName: req.body.fatherHusbandName,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        nationality: req.body.nationality,
        religion: req.body.religion,
        monthlyIncome: req.body.monthlyIncome,
        occupation: req.body.occupation,
        altPhone: req.body.altPhone,
        doctorName: req.body.doctorName,
        policyNumber: req.body.policyNumber,
        employerName: req.body.employerName,
        employerId: req.body.employerId,
        prescription: {
          data: req.files.prescription,
        },
        idProof: {
          data: req.files.idProof,
        },
        medicalInsurance: {
          data: req.files.medicalInsurance,
        },
      });
      await addHospitalForm.save();
      res.send({ status: "Registered sucessful" });
    } catch (e) {
      res.send(e.name);
    }
  }
};
exports.hospitalBedbooking = async (req, res) => {
  const { body } = req;
  const hospitalBedSchema = Joi.object().keys({
    bookingId: Joi.number().required(),
    hospitalCode: Joi.string().required(),
    date: Joi.date().greater("now").required(),
    time: Joi.string().required(),
    bookedDate: Joi.date(),
    bookedtime: Joi.string(),
  });
  let result = hospitalBedSchema.validate(body);
  console.log(result);
  if (result.error) {
    res.status(409).json("Enter valid details");
  } else {
    try {
      const alreadyBooked = await hospitalBed.findOne({
        bookingId: req.body.bookingId,
      });
      if (alreadyBooked) {
        res.send("Bed is already booked for this id");
      } else {
        const addHospitalBed = new hospitalBed(req.body);
        await addHospitalBed.save();
        res.send({ status: "Booked bed sucessfully" });
      }
    } catch (e) {
      res.send(e.name);
    }
  }
};
function bookID() {
  let p = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  let uid = "";
  for (let i = 0; i < 8; i++) {
    let c = Math.floor(Math.random() * (35 + 1));
    uid = uid.concat(p[c]);
  }
  return uid;
}

exports.allfindBedbooking = async (req ,res)=>{
  try{
      const BedbookingFind = await hospitalBed.find();
      res.status(200).json(BedbookingFind);
      }catch(err){
          res.status(500).json(err)
      }
  }  
  exports.findOneBedbooking = async (req ,res)=>{
    try{
        const BedbookingFind = await hospitalBed.findOne({bookingId:req.body.bookingId});
        res.status(200).json(BedbookingFind);
        }catch(err){
            res.status(500).json(err)
        }
    }  

  exports.allfindBedstatus = async (req ,res)=>{
    try{
        const BedstatusFind = await BedType.findOne({status:"accepted"})
        res.status(200).json(BedstatusFind);
        }catch(err){
            res.status(500).json(err)
        }
    }  
    exports.findBedstatus = async (req ,res)=>{
      try{
          const BedstatusFind = await BedType.findOne({hospitalCode:req.body.hospitalCode,status:"accepted"})
          res.status(200).json(BedstatusFind);
          }catch(err){
              res.status(500).json(err)
          }
      }  
