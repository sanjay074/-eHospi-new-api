const express = require("express");
const router = express.Router();
const {createServices,getAllServices} = require('../../services/controllers/servicescontroller');
router.post('/createServices',createServices);
router.get('/getAllServices',getAllServices)
module.exports=router; 