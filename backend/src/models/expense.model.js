const db = require("../db/db");

function addExpense(title, amount, date, callback) {
    const sql = `
        INSERT INTO expenses (title, amount, date)
        VALUES (?, ?, ?)
    `;

    db.run(sql, [title, amount, date], function (err) {
        callback(err, this?.lastID);
    });
}

function getAllExpenses(callback) {
    db.all("SELECT * FROM expenses", [], (err, rows) => {
        callback(err, rows);
    });
}

module.exports = {
    addExpense,
    getAllExpenses
};
