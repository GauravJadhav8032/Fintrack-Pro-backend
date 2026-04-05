const { z } = require("zod");

const dateString = z
  .string()
  .refine((val) => !Number.isNaN(Date.parse(val)), "Invalid date value");

const createRecordSchema = z.object({
  amount: z.number().positive("Amount must be greater than 0"),
  type: z.enum(["income", "expense"]),
  category: z.string().min(1).max(60),
  date: dateString,
  note: z.string().max(240).optional(),
});

const updateRecordSchema = z
  .object({
    amount: z.number().positive().optional(),
    type: z.enum(["income", "expense"]).optional(),
    category: z.string().min(1).max(60).optional(),
    date: dateString.optional(),
    note: z.string().max(240).nullable().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required",
  });

const recordIdParamSchema = z.object({
  id: z.uuid("Invalid record id"),
});

const listRecordQuerySchema = z.object({
  type: z.enum(["income", "expense"]).optional(),
  category: z.string().min(1).max(60).optional(),
  startDate: dateString.optional(),
  endDate: dateString.optional(),
  page: z
    .string()
    .regex(/^\d+$/)
    .transform((val) => Number(val))
    .optional(),
  limit: z
    .string()
    .regex(/^\d+$/)
    .transform((val) => Number(val))
    .optional(),
});

module.exports = {
  createRecordSchema,
  updateRecordSchema,
  recordIdParamSchema,
  listRecordQuerySchema,
};
