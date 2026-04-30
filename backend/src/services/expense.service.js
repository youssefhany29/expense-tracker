const db = require("../db/db");

function createExpense(data, callback) {
    const { title, amount, date } = data;
    const sql = `INSERT INTO expenses (title, amount, date) VALUES (?, ?, ?)`;

    db.run(sql, [title, amount, date], function (err) {
        callback(err, this?.lastID);
    });
}

function getExpenses(callback) {
    db.all("SELECT * FROM expenses", [], (err, rows) => {
        callback(err, rows);
    });
}

function getExpenseById(id) {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM expenses WHERE id = ?", [id], (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
}

function updateExpense(id, title, amount, date) {
    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE expenses SET title = ?, amount = ?, date = ? WHERE id = ?`,
            [title, amount, date, id],
            function (err) {
                if (err) reject(err);
                resolve(this.changes > 0);
            }
        );
    });
}

function deleteExpense(id) {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM expenses WHERE id = ?`, [id], function (err) {
            if (err) reject(err);
            resolve(this.changes > 0);
        });
    });
}

function searchExpenses(title, date) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT * FROM expenses
            WHERE title LIKE ? AND date LIKE ?
        `;

        db.all(sql, [`%${title}%`, `%${date}%`], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

module.exports = {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    searchExpenses
};
