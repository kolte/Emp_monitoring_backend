// Import the updateLeaveDetails function from the service
const { createOrUpdateLeave, getLeaveTypeData, getLeaveDatesWithEmployeeDetails, updateLeaveDetails, getApprovedLeaveDatesWithEmployeeDetails, getDeniedLeaveDatesWithEmployeeDetails } = require("./leave.service");

module.exports = {
  createLeave: (req, res) => {
    const data = req.body;

    createOrUpdateLeave(data, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: 0,
          message: "Database operation error",
        });
      }

      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getLeaveType: (req, res) => {
    getLeaveTypeData((err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Database operation error",
        });
      }

      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getLeaveDatesWithDetails: (req, res) => {
    const { employeeId } = req.query;
    getLeaveDatesWithEmployeeDetails(employeeId, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Database operation error",
        });
      }

      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getApprovedLeaveDatesWithDetails: (req, res) => {
    const { employeeId } = req.query;
    getApprovedLeaveDatesWithEmployeeDetails(employeeId, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Database operation error",
        });
      }

      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getDeniedLeaveDatesWithDetails: (req, res) => {
    const { employeeId } = req.query;
    getDeniedLeaveDatesWithEmployeeDetails(employeeId, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Database operation error",
        });
      }

      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  updateLeaveDetails: (req, res) => {
    const { id, leave_remark, leave_approved_status } = req.body;

    // Check if the required data is provided
    if (!id || !leave_remark || !leave_approved_status) {
      return res.status(400).json({
        success: 0,
        message: "Missing required data",
      });
    }

    // Call the updateLeaveDetails function from the service
    updateLeaveDetails({ id, leave_remark, leave_approved_status }, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: 0,
          message: "Database operation error",
        });
      }

      return res.status(200).json({
        success: 1,
        message: "Leave details updated successfully",
      });
    });
  },
};
