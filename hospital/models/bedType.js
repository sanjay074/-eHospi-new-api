const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bedTypeSchema = new Schema({
  hospitalName: {
    type: String,
   
  },
  status:{
    type:String
  },
  hospitalCode: {
    type: String,
   
  },
  hospitalType: {
    type: String,
  },
  hospitalAddress: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  phone: {
    type: String,
    max: 10,
  },
  services:{
      type:Array,
      required:true
  },
  generalWard: {
    amenities: {
      type: Array,
    },
    facilities: {
      type: Array,
    },
  },
  semiPrivate: {
    amenities: {
      type: Array,
    },
    facilities: {
      type: Array,
    },
  },
  private: {
    amenities: {
      type: Array,
    },
    facilities: {
      type: Array,
    },
  },
  multiBed: {
    amenities: {
      type: Array,
    },
    facilities: {
      type: Array,
    },
  },
  delux: {
    amenities: {
      type: Array,
    },
    facilities: {
      type: Array,
    },
  },
  ICU: {
    amenities: {
      type: Array,
    },
    facilities: {
      type: Array,
    },
  },
});
module.exports = mongoose.model("BedType", bedTypeSchema);