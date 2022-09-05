const express = require("express");
const employeeController = require("../controller/employee.controller");

const routes = new express.Router();

routes.post("/employee", employeeController.createEmployee);
routes.get("/employee", employeeController.getEmployee);
routes.get("/employee/:empId", employeeController.getEmployeeById);
routes.patch("/employee", employeeController.updateEmployee);
routes.delete("/employee/:empId", employeeController.deleteEmployee);

module.exports = routes;
