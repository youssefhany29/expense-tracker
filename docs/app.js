const API = "https://expense-tracker-azy1.onrender.com/api/expenses";

let editingId = null;
let allExpenses = [];

window.onload = function () {
    loadExpenses();
};

async function loadExpenses() {
    try {
        const response = await fetch(API_URL);
        const result = await response.json();

        if (!result.success) {
            showMessage("Failed to load expenses");
            return;
        }

        allExpenses = result.data;
        displayExpenses(allExpenses);
        updateDashboard(allExpenses);
    } catch (err) {
        showMessage("Cannot connect to backend server");
        console.error(err);
    }
}

function displayExpenses(expenses) {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    if (expenses.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4">No expenses found</td>
            </tr>
        `;
        return;
    }

    expenses.forEach((expense) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${expense.title}</td>
            <td>${Number(expense.amount).toFixed(2)}</td>
            <td>${expense.date}</td>
            <td>
                <button onclick="editExpense(${expense.id})">Edit</button>
                <button onclick="deleteExpense(${expense.id})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function updateDashboard(expenses) {
    const totalAmount = document.getElementById("totalAmount");
    const averageAmount = document.getElementById("averageAmount");
    const expenseCount = document.getElementById("expenseCount");
    const highestExpense = document.getElementById("highestExpense");
    const lowestExpense = document.getElementById("lowestExpense");

    if (expenses.length === 0) {
        totalAmount.textContent = "0.00";
        averageAmount.textContent = "0.00";
        expenseCount.textContent = "0";
        highestExpense.textContent = "0.00";
        lowestExpense.textContent = "0.00";
        return;
    }

    const amounts = expenses.map((expense) => Number(expense.amount));

    const total = amounts.reduce((sum, amount) => sum + amount, 0);
    const average = total / expenses.length;
    const highest = Math.max(...amounts);
    const lowest = Math.min(...amounts);

    totalAmount.textContent = total.toFixed(2);
    averageAmount.textContent = average.toFixed(2);
    expenseCount.textContent = expenses.length;
    highestExpense.textContent = highest.toFixed(2);
    lowestExpense.textContent = lowest.toFixed(2);
}

async function addExpense() {
    const title = document.getElementById("title").value.trim();
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;

    if (!title || !amount || !date) {
        showMessage("Please fill all fields");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                amount: Number(amount),
                date: date
            })
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            showMessage(result.message || "Failed to add expense");
            return;
        }

        showMessage("Expense added successfully");
        clearForm();
        loadExpenses();
    } catch (err) {
        showMessage("Cannot connect to backend server");
        console.error(err);
    }
}

function editExpense(id) {
    const expense = allExpenses.find((item) => item.id === id);

    if (!expense) {
        showMessage("Expense not found");
        return;
    }

    editingId = id;

    document.getElementById("title").value = expense.title;
    document.getElementById("amount").value = expense.amount;
    document.getElementById("date").value = expense.date;

    document.getElementById("formTitle").textContent = "Update Expense";
    document.getElementById("addBtn").style.display = "none";
    document.getElementById("updateBtn").style.display = "inline-block";
    document.getElementById("cancelBtn").style.display = "inline-block";
}

async function updateExpense() {
    if (!editingId) {
        showMessage("No expense selected");
        return;
    }

    const title = document.getElementById("title").value.trim();
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;

    if (!title || !amount || !date) {
        showMessage("Please fill all fields");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${editingId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                amount: Number(amount),
                date: date
            })
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            showMessage(result.message || "Failed to update expense");
            return;
        }

        showMessage("Expense updated successfully");
        clearForm();
        loadExpenses();
    } catch (err) {
        showMessage("Error updating expense");
        console.error(err);
    }
}

async function deleteExpense(id) {
    const confirmed = confirm("Are you sure you want to delete this expense?");

    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            showMessage(result.message || "Failed to delete expense");
            return;
        }

        showMessage("Expense deleted successfully");
        loadExpenses();
    } catch (err) {
        showMessage("Error deleting expense");
        console.error(err);
    }
}

async function searchExpenses() {
    const searchTitle = document.getElementById("searchTitle").value.trim();

    try {
        const response = await fetch(
            `${API_URL}/search?title=${encodeURIComponent(searchTitle)}`
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
            showMessage(result.message || "Search failed");
            return;
        }

        displayExpenses(result.data);
        updateDashboard(result.data);
        showMessage("Search completed");
    } catch (err) {
        showMessage("Error searching expenses");
        console.error(err);
    }
}

function clearSearch() {
    document.getElementById("searchTitle").value = "";
    displayExpenses(allExpenses);
    updateDashboard(allExpenses);
    showMessage("Search cleared");
}

function clearForm() {
    editingId = null;

    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";

    document.getElementById("formTitle").textContent = "Add Expense";
    document.getElementById("addBtn").style.display = "inline-block";
    document.getElementById("updateBtn").style.display = "none";
    document.getElementById("cancelBtn").style.display = "none";
}

function showMessage(message) {
    const messageElement = document.getElementById("message");

    messageElement.textContent = message;

    setTimeout(() => {
        messageElement.textContent = "";
    }, 3000);
}
