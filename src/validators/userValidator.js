const { z } = require("zod");

const createUserSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.email().max(120),
  password: z.string().min(8).max(100),
  role: z.enum(["admin", "analyst", "viewer"]),
  status: z.enum(["active", "inactive"]).optional(),
});

const updateUserSchema = z
  .object({
    name: z.string().min(2).max(80).optional(),
    role: z.enum(["admin", "analyst", "viewer"]).optional(),
    email: z.email().max(120).optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required",
  });

const updateStatusSchema = z.object({
  status: z.enum(["active", "inactive"]),
});

const userIdParamSchema = z.object({
  id: z.uuid("Invalid user id"),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  updateStatusSchema,
  userIdParamSchema,
};
