const express = require("express");
const router = express.Router();

const controller = require("../controllers/expense.controller");

/**
 * @swagger
 * /api/expenses:
 *   get:
 *     summary: Get all expenses
 *     description: Returns all expenses from database
 *     responses:
 *       200:
 *         description: List of expenses
 */
router.get("/", controller.getExpenses);

/**
 * @swagger
 * /api/expenses:
 *   post:
 *     summary: Create new expense
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               date:
 *                 type: string
 *     responses:
 *       201:
 *         description: Expense created
 *       400:
 *         description: Validation error
 */
router.post("/", controller.createExpense);

/**
 * @swagger
 * /api/expenses/search:
 *   get:
 *     summary: Search expenses
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results
 */
router.get("/search", controller.searchExpenses);

/**
 * @swagger
 * /api/expenses/{id}:
 *   get:
 *     summary: Get expense by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Expense found
 *       404:
 *         description: Not found
 */
router.get("/:id", controller.getExpenseById);

/**
 * @swagger
 * /api/expenses/{id}:
 *   put:
 *     summary: Update expense
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               date:
 *                 type: string
 *     responses:
 *       200:
 *         description: Expense updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Not found
 */
router.put("/:id", controller.updateExpense);

/**
 * @swagger
 * /api/expenses/{id}:
 *   delete:
 *     summary: Delete expense
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Expense deleted
 *       404:
 *         description: Not found
 */
router.delete("/:id", controller.deleteExpense);

module.exports = router;
