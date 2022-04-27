const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hospitalServicesSchema = new Schema({
      servicesName:{
        type:String,
        required:true
      }
})
  
module.exports = mongoose.model("HospitalServices", hospitalServicesSchema);
