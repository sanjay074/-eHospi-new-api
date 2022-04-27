const mongoose = require("mongoose");
//const { ObjectId } = mongoose.Schema;
 
 
const departmentSchema = new mongoose.Schema({
    department_name:{
        type: String,
        required: true
 
    }
}); 
module.exports = mongoose.model("Department", departmentSchema);
