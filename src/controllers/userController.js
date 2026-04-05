const asyncHandler = require("../middleware/asyncHandler");
const userService = require("../services/userService");

const createUser = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);
  return res.status(201).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
});

const getUsers = asyncHandler(async (_req, res) => {
  const users = await userService.getUsers();
  return res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  return res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: user,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id);
  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

const updateUserStatus = asyncHandler(async (req, res) => {
  const user = await userService.updateUserStatus(req.params.id, req.body.status);
  return res.status(200).json({
    success: true,
    message: "User status updated successfully",
    data: user,
  });
});

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  updateUserStatus,
};
