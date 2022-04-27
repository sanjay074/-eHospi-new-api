const axios = require("axios");
const userdb = require("../models/userProfile.js");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
//////////////////////////////////////phone login///////////////////////////
exports.phoneLogin = (req, res) => {
  const { body } = req;
  const blogSchema = Joi.object()
    .keys({
      phone: Joi.string()
        .regex(/^[6-9]{1}[0-9]{9}$/)
        .required(),
    })
    .required();
  let result = blogSchema.validate(body);
  if (result.error) {
    res.status(422).json("Please enter a valid number")
  } else {
    axios
      .get(
        "https://2factor.in/API/V1/c7573668-cfde-11ea-9fa5-0200cd936042/SMS/" +
          req.body.phone +
          "/AUTOGEN"
      )
      .then(function (response) {
        res.status(200).json(response.data);
      })
      .catch((er) => {
        res.status(500).json("Error");
      });
  }
};

//////////////////////////////////verifyOTP/////////////////////////////////
exports.verifyOTP = (req, res) => {
  const { body } = req;
  const otpSchema = Joi.object()
    .keys({
      details: Joi.string().required(),
      otp: Joi.number().max(999999).required(),
      phone: Joi.string()
        .regex(/^[6-9]{1}[0-9]{9}$/)
        .required(),
    })
    .required();
  let result = otpSchema.validate(body);
  if (result.error) {
    res.status(409).json("Please enter a valid details");
  } else {
    axios
      .get(
        "https://2factor.in/API/V1/c7573668-cfde-11ea-9fa5-0200cd936042/SMS/VERIFY/" +
          req.body.details +
          "/" +
          req.body.otp
      )
      .then(function (response) {
        if (response.data.Details === "OTP Matched") {
          const uid="ph"+req.body.phone;
          const token = jwt.sign({ uid: uid }, "123456", {
            expiresIn: "24h",
          });
          response.data.token = token;
          res.status(200).json(response.data);
        }
      })
      .catch((er) => {
        res.send({ Status: "Error", Details: "Invalid OTP" });
      });
  }
};
/////////////////////////////////create profile//////////////////
exports.createProfile = async (req, res) => {
  const { body } = req;
  const profileSchema = Joi.object()
    .keys({
      fullName: Joi.string().required(),
      dateOfBirth: Joi.date().less("now").greater("01-01-1920").required(),
      gender: Joi.string().valid("Male", "Female", "Other").required(),
      email: Joi.string().email().required(),
    })
    .required();
  let result = profileSchema.validate(body);
  if (result.error) {
    res.send("Please enter a valid details");
  } else {
    try {
      
      const phoneExist = await userdb.findOne({ uid: req.user.uid });
      if (!phoneExist) {
        const myphone = req.user.uid.slice(2);
        const createUser = new userdb({
          uid: req.user.uid,
          fullName: req.body.fullName,
          dateOfBirth: req.body.dateOfBirth,
          phone: myphone,
          gender: req.body.gender,
          email: req.body.email,
        });
        await createUser.save();
        res.send({ status: "Registered sucessfully" });
      } else {
        res.send({ status: "Profile already created" });
      }
    } catch (e) {
      res.send("An error occurred");
    }
  }
};
/////////////////////////////Show Profile/////////////////////////////////////
exports.showProfile = async (req, res) => {
  const phoneExist = await userdb.findOne(
    { uid: req.user.uid },
    { _id: 0, __v: 0, uid: 0 }
  );
  if (!phoneExist) {
    res.status(409).json("No data found");  
  } else {
    res.send(phoneExist);
  }
};


exports.isAlreadyRegistered = async (req, res) => {
  const { body } = req;
  
  const phoneExist = await userdb.findOne(
    { phone:req.body.phone }
  );
  if (!phoneExist) {
    res.status(409).json("No data found");
  } else {
    res.status(422).json("User already registered");
  }
};