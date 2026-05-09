const API = "http://localhost:5000/api/expenses";

let editingId = null;

document.getElementById("date").value = new Date().toISOString().split("T")[0];

function showMessage(text) {
    document.getElementById("message").textContent = text;
}

function validateForm(title, amount, date) {
    if (!title.trim()) {
        showMessage("Title is required");
        return false;
    }

    if (!amount || Number(amount) <= 0) {
        showMessage("Amount must be greater than 0");
        return false;
    }

    if (!date) {
        showMessage("Date is required");
        return false;
    }

    return true;
}

async function loadExpenses() {
    try {
        const response = await fetch(API);
        const result = await response.json();

        renderExpenses(result.data);
    } catch (err) {
        showMessage("Cannot connect to server");
    }
}

function renderExpenses(expenses) {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    if (!expenses || expenses.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4">No expenses found</td>
            </tr>
        `;
        return;
    }

    expenses.forEach(expense => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${expense.title}</td>
            <td>${expense.amount}</td>
            <td>${expense.date}</td>
            <td>
                <button onclick="startEdit(${expense.id}, '${expense.title}', ${expense.amount}, '${expense.date}')">Edit</button>
                <button onclick="deleteExpense(${expense.id})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

async function addExpense() {
    const title = document.getElementById("title").value;
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;

    if (!validateForm(title, amount, date)) return;

    try {
        const response = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                amount: Number(amount),
                date
            })
        });

        const result = await response.json();

        if (!result.success) {
            showMessage(result.message);
            return;
        }

        clearForm();
        loadExpenses();
        showMessage("Expense added successfully");
    } catch (err) {
        showMessage("Failed to add expense");
    }
}

function startEdit(id, title, amount, date) {
    editingId = id;

    document.getElementById("title").value = title;
    document.getElementById("amount").value = amount;
    document.getElementById("date").value = date;

    document.getElementById("formTitle").textContent = "Update Expense";
    document.getElementById("addBtn").style.display = "none";
    document.getElementById("updateBtn").style.display = "inline-block";
    document.getElementById("cancelBtn").style.display = "inline-block";
}

async function updateExpense() {
    const title = document.getElementById("title").value;
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;

    if (!validateForm(title, amount, date)) return;

    try {
        const response = await fetch(`${API}/${editingId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                amount: Number(amount),
                date
            })
        });

        const result = await response.json();

        if (!result.success) {
            showMessage(result.message);
            return;
        }

        clearForm();
        loadExpenses();
        showMessage("Expense updated successfully");
    } catch (err) {
        showMessage("Failed to update expense");
    }
}

async function deleteExpense(id) {
    try {
        const response = await fetch(`${API}/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if (!result.success) {
            showMessage(result.message);
            return;
        }

        loadExpenses();
        showMessage("Expense deleted successfully");
    } catch (err) {
        showMessage("Failed to delete expense");
    }
}

async function searchExpenses() {
    const title = document.getElementById("searchTitle").value;

    try {
        const response = await fetch(`${API}/search?title=${encodeURIComponent(title)}`);
        const result = await response.json();

        renderExpenses(result.data);
    } catch (err) {
        showMessage("Search failed");
    }
}

function clearSearch() {
    document.getElementById("searchTitle").value = "";
    loadExpenses();
}

function clearForm() {
    editingId = null;

    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = new Date().toISOString().split("T")[0];

    document.getElementById("formTitle").textContent = "Add Expense";
    document.getElementById("addBtn").style.display = "inline-block";
    document.getElementById("updateBtn").style.display = "none";
    document.getElementById("cancelBtn").style.display = "none";
}

loadExpenses();