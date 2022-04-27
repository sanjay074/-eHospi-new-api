const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const  faciliesSchema = new Schema({
   facilitiesName:{
       type:String,
       required:true
   },
   facilitiesCharges:{
       type:Number,
       required:true
   }
});
module.exports = mongoose.model('Facilies',faciliesSchema);