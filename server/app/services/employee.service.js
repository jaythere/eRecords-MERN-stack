const errorMessages = require("../utils/error-message").errorMessages;
const employeeModel = require("../model/employee.model");

class EmployeeServices {
  async create({ name, age, email, dob, address }, res) {
    if (!name) {
      return res.status(400).json({
        error: errorMessages.NoName,
      });
    } else if (!age) {
      return res.status(400).json({
        error: errorMessages.NoAge,
      });
    } else if (!email) {
      return res.status(400).json({
        error: errorMessages.NoEmail,
      });
    } else if (!dob) {
      return res.status(400).json({
        error: errorMessages.NoDob,
      });
    } else if (!address) {
      return res.status(400).json({
        error: errorMessages.NoAddress,
      });
    }

    try {
      const result = await employeeModel.create({
        name,
        email,
        age,
        dob,
        address,
      });
      return res.status(200).json({
        user: result,
      });
    } catch (error) {
      return res.status(400).json({
        error: errorMessages.OopsSomethingWentWrong,
        status: "400",
      });
    }
  }

  async getEmployee(res) {
    try {
      const result = await employeeModel.find();
      return res.status(200).json({
        users: result,
      });
    } catch (error) {
      return res.status(400).json({
        error: errorMessages.OopsSomethingWentWrong,
        status: "400",
      });
    }
  }

  async getEmployeeById(res, empId) {
    try {
      const result = await employeeModel.findById(empId);
      return res.status(200).json({
        user: result,
      });
    } catch (error) {
      return res.status(400).json({
        error: errorMessages.OopsSomethingWentWrong,
        status: "400",
      });
    }
  }

  async updateEmployee({ id, name, age, email, dob, address }, res) {
    if (!id) {
      return res.status(400).json({
        error: errorMessages.NoUserId,
        status: "400",
      });
    }
    try {
      const user = await employeeModel.findById(id);

      if (!user) {
        return res.status(400).json({
          msg: errorMessages.NoUserFound,
        });
      }

      user.set({
        name: name,
        age: age,
        email: email,
        dob: dob,
        address: address,
      });
      await user.save();
      return res.status(200).json({
        status: "Success",
        msg: "Records Updated",
      });
    } catch (error) {
      return res.status(400).json({
        error: errorMessages.InvalidUserInput,
        status: "400",
      });
    }
  }

  async deleteEmployee(empId, res) {
    try {
      await employeeModel.findOneAndDelete(empId);
      return res.status(200).json({
        status: "Success",
        msg: "Records Deleted",
      });
    } catch (error) {
      return res.status(400).json({
        error: errorMessages.OopsSomethingWentWrong,
        status: "400",
      });
    }
  }
}

const employeeService = new EmployeeServices();

module.exports = employeeService;
