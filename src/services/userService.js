const bcrypt = require("bcrypt");
const ApiError = require("../utils/apiError");
const userModel = require("../models/userModel");
const { toSafeUser } = require("../utils/serializers");

async function createUser(payload) {
  const existing = await userModel.findUserByEmail(payload.email);
  if (existing) {
    throw new ApiError(400, "Email is already in use");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 12);
  const user = await userModel.createUser({
    ...payload,
    password: hashedPassword,
  });

  return toSafeUser(user);
}

async function getUsers() {
  const users = await userModel.listUsers();
  return users.map((user) => toSafeUser(user));
}

async function updateUser(userId, payload) {
  const existing = await userModel.findUserById(userId);
  if (!existing) {
    throw new ApiError(404, "User not found");
  }

  if (payload.email && payload.email !== existing.email) {
    const duplicate = await userModel.findUserByEmail(payload.email);
    if (duplicate) {
      throw new ApiError(400, "Email is already in use");
    }
  }

  const updated = await userModel.updateUser(userId, payload);
  return toSafeUser(updated);
}

async function deleteUser(userId) {
  const existing = await userModel.findUserById(userId);
  if (!existing) {
    throw new ApiError(404, "User not found");
  }

  await userModel.deleteUser(userId);
}

async function updateUserStatus(userId, status) {
  const existing = await userModel.findUserById(userId);
  if (!existing) {
    throw new ApiError(404, "User not found");
  }

  const updated = await userModel.updateUser(userId, { status });
  return toSafeUser(updated);
}

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  updateUserStatus,
};
