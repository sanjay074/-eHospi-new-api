const express = require('express');
const router = express.Router();
const{createdoctorDepartment,getAllDoctorBydepartment,} = require('../controllers/departmentContollers')

router.post('/createdoctorDepartment',createdoctorDepartment);
router.get('/getAllDoctorBydepartment',getAllDoctorBydepartment);
//router.get('/getAllDoctor',fetcDoctro);
module.exports=router;
