const ExpenseService = require("../src/services/expense.service");

function createTestExpense() {
    return new Promise((resolve, reject) => {
        const data = {
            title: "Coffee",
            amount: 50,
            date: "2026-04-30"
        };

        ExpenseService.createExpense(data, (err, id) => {
            if (err) reject(err);
            else resolve(id);
        });
    });
}

describe("Expense Service Tests", () => {

    test("should create expense", async () => {
        const id = await createTestExpense();
        expect(id).toBeDefined();
    });

    test("should get all expenses", (done) => {
        ExpenseService.getExpenses((err, data) => {
            expect(err).toBeNull();
            expect(Array.isArray(data)).toBe(true);
            done();
        });
    });

    test("should update expense", async () => {
        const id = await createTestExpense();

        const result = await ExpenseService.updateExpense(
            id,
            "Tea",
            20,
            "2026-04-30"
        );

        expect(result).toBe(true);
    });

    test("should delete expense", async () => {
        const id = await createTestExpense();

        const result = await ExpenseService.deleteExpense(id);

        expect(result).toBe(true);
    });

});