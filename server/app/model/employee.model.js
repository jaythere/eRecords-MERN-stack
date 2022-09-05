const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  age: {
    type: Number,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  dob: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  photo: {
    type: String,
  },
});

const employeeModel = mongoose.model("USERS", employeeSchema);
module.exports = employeeModel;
