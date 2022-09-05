const employeeService = require("../services/employee.service");
const { errorMessages } = require("../utils/error-message");
const employeeModel = require("../model/employee.model");

const createEmployee = async (req, res) => {
  try {
    await employeeService.create(req.body, res);
  } catch (error) {
    return res.status(400).json({
      error: errorMessages.OopsSomethingWentWrong,
      status: "400",
    });
  }
};

const getEmployeeById = async (req, res, next) => {
  try {
    const { empId } = req.params;
    await employeeService.getEmployeeById(res, empId);
  } catch (error) {
    return res.status(400).json({
      error: errorMessages.OopsSomethingWentWrong,
      status: "400",
    });
  }
};

const getEmployee = async (req, res, next) => {
  try {
    await employeeService.getEmployee(res);
  } catch (error) {
    return res.status(400).json({
      error: errorMessages.OopsSomethingWentWrong,
      status: "400",
    });
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    await employeeService.updateEmployee(req.body, res);
  } catch (error) {
    return res.status(400).json({
      error: errorMessages.OopsSomethingWentWrong,
      status: "400",
    });
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const { empId } = req.params;
    await employeeService.deleteEmployee(empId, res);
  } catch (error) {
    return res.status(400).json({
      error: errorMessages.OopsSomethingWentWrong,
      status: "400",
    });
  }
};

module.exports.createEmployee = createEmployee;
module.exports.getEmployee = getEmployee;
module.exports.getEmployeeById = getEmployeeById;
module.exports.updateEmployee = updateEmployee;
module.exports.deleteEmployee = deleteEmployee;
