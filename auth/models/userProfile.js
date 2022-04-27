const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  roles:{
    type: [String],
    enum:["user",'admin'],
    default:["user"]
    },
});

module.exports = model("User", userSchema);
