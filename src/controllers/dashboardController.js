const asyncHandler = require("../middleware/asyncHandler");
const dashboardService = require("../services/dashboardService");

const summary = asyncHandler(async (_req, res) => {
  const data = await dashboardService.getSummary();
  return res.status(200).json({
    success: true,
    message: "Dashboard summary fetched successfully",
    data,
  });
});

const categories = asyncHandler(async (_req, res) => {
  const data = await dashboardService.getCategories();
  return res.status(200).json({
    success: true,
    message: "Category breakdown fetched successfully",
    data,
  });
});

const trends = asyncHandler(async (req, res) => {
  const data = await dashboardService.getTrends(req.query.year);
  return res.status(200).json({
    success: true,
    message: "Dashboard trends fetched successfully",
    data,
  });
});

const recent = asyncHandler(async (req, res) => {
  const data = await dashboardService.getRecent(req.query.limit || 5);
  return res.status(200).json({
    success: true,
    message: "Recent transactions fetched successfully",
    data,
  });
});

module.exports = {
  summary,
  categories,
  trends,
  recent,
};
