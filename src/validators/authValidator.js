const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(80),
  email: z.email("Invalid email address").max(120),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100),
  role: z.enum(["admin", "analyst", "viewer"]).optional(),
  status: z.enum(["active", "inactive"]).optional(),
});

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

module.exports = {
  registerSchema,
  loginSchema,
};
