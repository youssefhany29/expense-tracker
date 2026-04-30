const ExpenseService = require("../services/expense.service");
const { success, error } = require("../utils/response");
const validateExpense = require("../utils/validateExpense");

function createExpense(req, res) {
    const { title, amount, date } = req.body;

    const validationError = validateExpense(title, amount, date);
    if (validationError) {
        return error(res, validationError, 400);
    }

    ExpenseService.createExpense(req.body, (err, id) => {
        if (err) return error(res, err.message, 500);

        return success(res, { id }, "Expense created", 201);
    });
}

function getExpenses(req, res) {
    ExpenseService.getExpenses((err, data) => {
        if (err) return error(res, err.message, 500);
        return success(res, data);
    });
}

async function getExpenseById(req, res, next) {
    try {
        const expense = await ExpenseService.getExpenseById(req.params.id);

        if (!expense) {
            return error(res, "Not found", 404);
        }

        return success(res, expense);
    } catch (err) {
        return next(err);
    }
}

async function updateExpense(req, res, next) {
    const { title, amount, date } = req.body;

    const validationError = validateExpense(title, amount, date);
    if (validationError) {
        return error(res, validationError, 400);
    }

    try {
        const updated = await ExpenseService.updateExpense(
            req.params.id,
            title,
            amount,
            date
        );

        if (!updated) {
            return error(res, "Not found", 404);
        }

        return success(res, null, "Updated");
    } catch (err) {
        return next(err);
    }
}

async function deleteExpense(req, res, next) {
    try {
        const deleted = await ExpenseService.deleteExpense(req.params.id);

        if (!deleted) {
            return error(res, "Not found", 404);
        }

        return success(res, null, "Deleted");
    } catch (err) {
        return next(err);
    }
}

async function searchExpenses(req, res, next) {
    try {
        const data = await ExpenseService.searchExpenses(
            req.query.title || "",
            req.query.date || ""
        );

        return success(res, data);
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    searchExpenses
};
