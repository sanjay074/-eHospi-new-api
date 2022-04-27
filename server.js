require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const userRoute = require('./auth/routes/login');
const hospitalRoute = require('./hospital/routes/hospitalRouter');
const hospitalfacilies = require('./hospitalfacilies/routes/facilies');
const services = require('./services/routes/hospitalRouter');
const department = require('./department/routes/doctor');
async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://userProfiles:MoBohTt3PGtlsyCy@cluster0.nx0ry.mongodb.net/eHospiDatabase?retryWrites=true&w=majority"
    );
    console.log("Database connected sucessfully");
  } catch (error) {
    console.log(error);
  }
}
main();
app.use('/api',userRoute);
app.use('/api',hospitalRoute);
app.use('/api',hospitalfacilies);
app.use('/api',services);
app.use('/api',department);
var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server is running on: ' + PORT));
