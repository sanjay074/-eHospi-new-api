const Amenities = require("../models/facilies");
const Facilies = require('../models/hospital facility');
exports.addAmenities = async(req,res)=>{
    const newamenities = await new Amenities(req.body);
    try{
     const saveAmenities = await newamenities.save();
     res.status(200).json(saveAmenities);
    }catch(err){
        res.status(500).json(err);
    }
} 
exports.allfindAmenities = async (req ,res)=>{
    try{
        const amenitiesFind = await Amenities.find();
        res.status(200).json(amenitiesFind);
        }catch(err){
            res.status(500).json(err)
        }
    }  
exports.findOne = async(req ,res)=>{
    try{
    const facilisFind = await Amenities.findById(req.params.id);
     res.status(200).json(facilisFind);
    }catch(err){
        res.status(500).json(err)
    }
}  

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns json
 * @description addfacilies API
 * @date 27/03/2022
 * @author Sanjay kuamr
 */
exports.addfacilies = async(req,res)=>{
    const newfacilies = await new Facilies(req.body);
    try{
     const savefacilies = await newfacilies.save();
     res.status(200).json(savefacilies);
    }catch(err){
        res.status(500).json(err);
    }
} 
exports.allfindfacilies = async (req ,res)=>{
    try{
        const faciliesFind = await Facilies.find();
        res.status(200).json(faciliesFind);
        }catch(err){
            res.status(500).json(err)
        }
    }  
exports.findOnefacilies = async(req ,res)=>{
    try{
    const faciliesFind = await Facilies.findById(req.params.id);
     res.status(200).json(faciliesFind);
    }catch(err){
        res.status(500).json(err)
    }
}  

