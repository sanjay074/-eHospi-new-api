const { model, Schema } = require("mongoose");

const hospitalBedbookingSchema = new Schema({
  bookingId: {
    type: Number,
    required: true,
  },
  date:{
    type: String,
    required: true,
  },
  time:{
    type: String,
    required: true,
  },
  bookedDate:{
    type:Date,
    default:Date.now,
  },
  bookedtime:{
    type:String
  }
});

module.exports = model("HospitalBedbooking", hospitalBedbookingSchema);
