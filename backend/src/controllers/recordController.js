const asyncHandler = require("../middleware/asyncHandler");
const recordService = require("../services/recordService");

const createRecord = asyncHandler(async (req, res) => {
  const record = await recordService.createRecord(req.body, req.user.id);
  return res.status(201).json({
    success: true,
    message: "Record created successfully",
    data: record,
  });
});

const getRecords = asyncHandler(async (req, res) => {
  const records = await recordService.getRecords(req.query);
  return res.status(200).json({
    success: true,
    message: "Records fetched successfully",
    data: records,
  });
});

const getRecordById = asyncHandler(async (req, res) => {
  const record = await recordService.getRecordById(req.params.id);
  return res.status(200).json({
    success: true,
    message: "Record fetched successfully",
    data: record,
  });
});

const updateRecord = asyncHandler(async (req, res) => {
  const record = await recordService.updateRecord(req.params.id, req.body);
  return res.status(200).json({
    success: true,
    message: "Record updated successfully",
    data: record,
  });
});

const deleteRecord = asyncHandler(async (req, res) => {
  await recordService.deleteRecord(req.params.id);
  return res.status(200).json({
    success: true,
    message: "Record deleted successfully",
  });
});

module.exports = {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
};
