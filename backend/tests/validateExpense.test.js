const validateExpense = require("../src/utils/validateExpense");

describe("Expense Validation Tests", () => {

    test("should reject empty title", () => {
        expect(validateExpense("", 50, "2026-04-30")).toBe("Title is required");
    });

    test("should reject negative amount", () => {
        expect(validateExpense("Coffee", -10, "2026-04-30")).toBe("Amount must be positive");
    });

    test("should reject invalid date", () => {
        expect(validateExpense("Coffee", 50, "wrong-date")).toBe("Invalid date");
    });

    test("should accept valid expense", () => {
        expect(validateExpense("Coffee", 50, "2026-04-30")).toBe(null);
    });

});