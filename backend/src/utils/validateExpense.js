function validateExpense(title, amount, date) {
    if (!title || title.trim() === "") return "Title is required";
    if (amount === null || isNaN(amount) || Number(amount) <= 0)
        return "Amount must be positive";
    if (!date || isNaN(Date.parse(date))) return "Invalid date";
    return null;
}

module.exports = validateExpense;