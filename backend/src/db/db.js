const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./expense.db", (err) => {
    if (err) {
        console.log("DB Error:", err.message);
    } else {
        console.log("Connected to SQLite database");
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        amount REAL NOT NULL,
        date TEXT NOT NULL
    )
`);

module.exports = db;
