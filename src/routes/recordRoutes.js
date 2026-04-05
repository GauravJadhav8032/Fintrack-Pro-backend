const express = require("express");
const recordController = require("../controllers/recordController");
const validate = require("../middleware/validate");
const { verifyToken } = require("../middleware/auth");
const authorizeRoles = require("../middleware/authorizeRoles");
const {
  createRecordSchema,
  updateRecordSchema,
  recordIdParamSchema,
  listRecordQuerySchema,
} = require("../validators/recordValidator");

const router = express.Router();

router.use(verifyToken);

/**
 * @swagger
 * /api/records:
 *   get:
 *     tags: [Records]
 *     summary: List records
 *     description: Admin and analyst endpoint for paginated record listing with filters.
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [income, expense]
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           example: food
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           example: 2026-01-01
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           example: 2026-12-31
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Records fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Record'
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                         limit:
 *                           type: integer
 *                         total:
 *                           type: integer
 *                         totalPages:
 *                           type: integer
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", authorizeRoles(["admin", "analyst"]), validate(listRecordQuerySchema, "query"), recordController.getRecords);

/**
 * @swagger
 * /api/records/{id}:
 *   get:
 *     tags: [Records]
 *     summary: Get record by id
 *     description: Admin and analyst endpoint to fetch one record.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Record fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Record'
 *       404:
 *         description: Record not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:id", authorizeRoles(["admin", "analyst"]), validate(recordIdParamSchema, "params"), recordController.getRecordById);

/**
 * @swagger
 * /api/records:
 *   post:
 *     tags: [Records]
 *     summary: Create record
 *     description: Admin-only endpoint to create a financial record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount, type, category, date]
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 1200.5
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 example: income
 *               category:
 *                 type: string
 *                 example: salary
 *               date:
 *                 type: string
 *                 example: 2026-04-01
 *               note:
 *                 type: string
 *                 example: April salary
 *     responses:
 *       201:
 *         description: Record created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Record'
 */
router.post("/", authorizeRoles(["admin"]), validate(createRecordSchema), recordController.createRecord);

/**
 * @swagger
 * /api/records/{id}:
 *   patch:
 *     tags: [Records]
 *     summary: Update record
 *     description: Admin-only endpoint to update financial record fields.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 800.25
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               category:
 *                 type: string
 *                 example: groceries
 *               date:
 *                 type: string
 *                 example: 2026-04-05
 *               note:
 *                 type: string
 *                 nullable: true
 *                 example: Weekly grocery update
 *     responses:
 *       200:
 *         description: Record updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Record'
 */
router.patch("/:id", authorizeRoles(["admin"]), validate(recordIdParamSchema, "params"), validate(updateRecordSchema), recordController.updateRecord);

/**
 * @swagger
 * /api/records/{id}:
 *   delete:
 *     tags: [Records]
 *     summary: Soft delete record
 *     description: Admin-only endpoint to soft delete a financial record.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Record deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   example: {}
 */
router.delete("/:id", authorizeRoles(["admin"]), validate(recordIdParamSchema, "params"), recordController.deleteRecord);

module.exports = router;
