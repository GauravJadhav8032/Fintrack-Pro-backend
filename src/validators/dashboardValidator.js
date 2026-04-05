const { z } = require("zod");

const recentQuerySchema = z.object({
  limit: z
    .string()
    .regex(/^\d+$/)
    .transform((val) => Number(val))
    .optional(),
});

const trendsQuerySchema = z.object({
  year: z
    .string()
    .regex(/^\d{4}$/)
    .transform((val) => Number(val))
    .optional(),
});

module.exports = {
  recentQuerySchema,
  trendsQuerySchema,
};
