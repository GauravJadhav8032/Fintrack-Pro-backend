const dotenv = require("dotenv");

dotenv.config();

const env = {
  port: Number(process.env.PORT) || 3000,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
  nodeEnv: process.env.NODE_ENV || "development",
};

if (!env.jwtSecret) {
  throw new Error("JWT_SECRET is required in environment variables");
}

module.exports = env;
