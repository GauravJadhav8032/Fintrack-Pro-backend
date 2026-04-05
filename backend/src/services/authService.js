const bcrypt = require("bcrypt");
const ApiError = require("../utils/apiError");
const userModel = require("../models/userModel");
const { signAccessToken } = require("../utils/auth");
const { toSafeUser } = require("../utils/serializers");

async function register(payload) {
  const existing = await userModel.findUserByEmail(payload.email);
  if (existing) {
    throw new ApiError(400, "Email is already in use");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 12);
  const createdUser = await userModel.createUser({
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
    role: payload.role || "viewer",
    status: payload.status || "active",
  });

  const token = signAccessToken({
    sub: createdUser.id,
    role: createdUser.role,
    email: createdUser.email,
  });

  return {
    user: toSafeUser(createdUser),
    token,
  };
}

async function login(payload) {
  const user = await userModel.findUserByEmail(payload.email);
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (user.status !== "active") {
    throw new ApiError(403, "User account is inactive");
  }

  const isValidPassword = await bcrypt.compare(payload.password, user.password);
  if (!isValidPassword) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = signAccessToken({
    sub: user.id,
    role: user.role,
    email: user.email,
  });

  return {
    user: toSafeUser(user),
    token,
  };
}

async function getCurrentUser(userId) {
  const user = await userModel.findUserById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return toSafeUser(user);
}

module.exports = {
  register,
  login,
  getCurrentUser,
};
