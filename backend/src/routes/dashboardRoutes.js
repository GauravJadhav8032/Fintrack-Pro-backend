const express = require("express");
const dashboardController = require("../controllers/dashboardController");
const { verifyToken } = require("../middleware/auth");
const authorizeRoles = require("../middleware/authorizeRoles");
const validate = require("../middleware/validate");
const { recentQuerySchema, trendsQuerySchema } = require("../validators/dashboardValidator");

const router = express.Router();

router.use(verifyToken, authorizeRoles(["admin", "analyst", "viewer"]));

/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     tags: [Dashboard]
 *     summary: Financial summary
 *     description: Returns total income, total expense, and net balance.
 *     responses:
 *       200:
 *         description: Summary fetched
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
 *                     totalIncome:
 *                       type: number
 *                       example: 12000
 *                     totalExpense:
 *                       type: number
 *                       example: 4500
 *                     netBalance:
 *                       type: number
 *                       example: 7500
 */
router.get("/summary", dashboardController.summary);

/**
 * @swagger
 * /api/dashboard/categories:
 *   get:
 *     tags: [Dashboard]
 *     summary: Category aggregates
 *     description: Returns category-wise transaction totals.
 *     responses:
 *       200:
 *         description: Category aggregates fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       category:
 *                         type: string
 *                         example: salary
 *                       totalAmount:
 *                         type: number
 *                         example: 9000
 *                       transactions:
 *                         type: integer
 *                         example: 3
 */
router.get("/categories", dashboardController.categories);

/**
 * @swagger
 * /api/dashboard/trends:
 *   get:
 *     tags: [Dashboard]
 *     summary: Monthly trends
 *     description: Returns monthly income, expense, and net trend values.
 *     parameters:
 *       - in: query
 *         name: year
 *         required: false
 *         schema:
 *           type: integer
 *           example: 2026
 *     responses:
 *       200:
 *         description: Trends fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: string
 *                         example: 2026-04
 *                       income:
 *                         type: number
 *                         example: 5000
 *                       expense:
 *                         type: number
 *                         example: 1200
 *                       net:
 *                         type: number
 *                         example: 3800
 */
router.get("/trends", validate(trendsQuerySchema, "query"), dashboardController.trends);

/**
 * @swagger
 * /api/dashboard/recent:
 *   get:
 *     tags: [Dashboard]
 *     summary: Recent transactions
 *     description: Returns the most recent transactions with optional limit.
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Recent transactions fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Record'
 */
router.get("/recent", validate(recentQuerySchema, "query"), dashboardController.recent);

module.exports = router;
