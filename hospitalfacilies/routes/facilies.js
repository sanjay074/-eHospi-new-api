const express = require('express');
const router = express.Router();
const{addAmenities,allfindAmenities ,findOne,addfacilies,allfindfacilies,findOnefacilies } = require('../controllers/faciliescontroller');


router.post('/addAmenities',addAmenities);
router.get('/allfindAmenities',allfindAmenities);
router.get('/findAmenitiesOne/:id',  findOne);
router.post('/addfacilies',addfacilies);
router.get('/allfindfacilies',allfindfacilies);
router.get('/findOnefaciliesOne/:id',  findOnefacilies );
module.exports=router;
