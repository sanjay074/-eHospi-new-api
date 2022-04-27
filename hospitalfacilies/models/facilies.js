const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const  amenitiesSchema = new Schema({
   amenities:{
       type:String,
       required:true
   },
   amenitiesCharges:{
       type:Number,
       required:true
   }
});
module.exports = mongoose.model('Amenities', amenitiesSchema);