# Expense Tracker API

A RESTful expense tracking application built with Node.js, Express, and SQLite. Supports full CRUD operations, input validation, search functionality, and interactive API documentation via Swagger UI.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [Running the Frontend](#running-the-frontend)
- [Running Tests](#running-tests)
- [API Reference](#api-reference)
- [Swagger Documentation](#swagger-documentation)

---

## Features

- Create, read, update, and delete expenses
- Search expenses by title and/or date
- Input validation on both frontend and backend
- Interactive API documentation with Swagger UI
- Unit tested business logic layer
- Modular architecture: routes → controllers → services → database

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Backend | Node.js, Express |
| Database | SQLite3 |
| API Docs | Swagger UI, OpenAPI 3.0 |
| Testing | Jest |

---

## Project Structure

```txt
expense-tracker/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── controllers/
│   │   │   └── expense.controller.js
│   │   ├── services/
│   │   │   └── expense.service.js
│   │   ├── routes/
│   │   │   └── expense.routes.js
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   ├── utils/
│   │   │   ├── validateExpense.js
│   │   │   └── response.js
│   │   ├── db/
│   │   │   └── db.js
│   │   └── swagger/
│   │       └── swagger.config.js
│   ├── tests/
│   │   ├── expense.service.test.js
│   │   └── validateExpense.test.js
│   ├── expense.db
│   └── package.json
│
└── frontend/
    ├── index.html
    ├── app.js
    └── style.css
```

---

## Setup and Installation

### Prerequisites

- Node.js v18 or higher
- npm

### Steps

1. Clone the repository:

```bash
git clone https://github.com/your-username/expense-tracker.git
```

2. Open the project backend folder:

```bash
cd expense-tracker/backend
```

3. Install dependencies:

```bash
npm install
```

4. The SQLite database is created automatically when the backend starts. No manual database setup is required.

---

## Running the Application

From inside the `backend` folder, run:

```bash
node src/app.js
```

The server will start on:

```txt
http://localhost:5000
```

Expected terminal output:

```txt
Connected to SQLite database
Server running at: http://localhost:5000
Swagger Docs available at: http://localhost:5000/api-docs
API Base URL: http://localhost:5000/api/expenses
```

---

## Running the Frontend

Open this file in the browser:

```txt
frontend/index.html
```

The frontend uses Vanilla JavaScript and communicates with the backend using asynchronous `fetch` requests.

The page dynamically updates without requiring a full page reload.

---

## Running Tests

From inside the `backend` folder, run:

```bash
npm test
```

The project uses Jest for unit testing.

The tests cover the business logic layer and validation logic.

### Tested service functions

- `createExpense`
- `getExpenses`
- `updateExpense`
- `deleteExpense`

### Tested validation cases

- Empty title
- Invalid amount
- Invalid date
- Valid expense data

Expected result:

```txt
PASS  tests/validateExpense.test.js
PASS  tests/expense.service.test.js

Test Suites: 2 passed, 2 total
Tests: 8 passed, 8 total
```

---

## API Reference

Base URL:

```txt
http://localhost:5000/api/expenses
```

All requests and responses use JSON format.

---

## Get All Expenses

```txt
GET /api/expenses
```

### Response 200

```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": 1,
      "title": "Groceries",
      "amount": 85.5,
      "date": "2026-04-30"
    }
  ]
}
```

---

## Get Expense By ID

```txt
GET /api/expenses/:id
```

### Response 200

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "id": 1,
    "title": "Groceries",
    "amount": 85.5,
    "date": "2026-04-30"
  }
}
```

### Response 404

```json
{
  "success": false,
  "message": "Not found"
}
```

---

## Search Expenses

```txt
GET /api/expenses/search?title=coffee&date=2026-04-30
```

Both query parameters are optional and can be used independently or together.

| Parameter | Type | Description |
|---|---|---|
| `title` | string | Partial match search on expense title |
| `date` | string | Date search using `YYYY-MM-DD` format |

### Response 200

```json
{
  "success": true,
  "message": "Success",
  "data": []
}
```

If no matching expenses are found, the API still returns status code `200` with an empty array because the search request was completed successfully.

---

## Create Expense

```txt
POST /api/expenses
```

### Request Body

```json
{
  "title": "Coffee",
  "amount": 12.5,
  "date": "2026-04-30"
}
```

| Field | Type | Required | Validation |
|---|---|---|---|
| `title` | string | Yes | Cannot be empty |
| `amount` | number | Yes | Must be greater than 0 |
| `date` | string | Yes | Must be a valid date |

### Response 201

```json
{
  "success": true,
  "message": "Expense created",
  "data": {
    "id": 5
  }
}
```

### Response 400

```json
{
  "success": false,
  "message": "Amount must be positive"
}
```

---

## Update Expense

```txt
PUT /api/expenses/:id
```

### Request Body

```json
{
  "title": "Tea",
  "amount": 20,
  "date": "2026-04-30"
}
```

### Response 200

```json
{
  "success": true,
  "message": "Updated",
  "data": null
}
```

### Response 400

```json
{
  "success": false,
  "message": "Amount must be positive"
}
```

### Response 404

```json
{
  "success": false,
  "message": "Not found"
}
```

---

## Delete Expense

```txt
DELETE /api/expenses/:id
```

### Response 200

```json
{
  "success": true,
  "message": "Deleted",
  "data": null
}
```

### Response 404

```json
{
  "success": false,
  "message": "Not found"
}
```

---

## Swagger Documentation

Interactive API documentation is available at:

```txt
http://localhost:5000/api-docs
```

Swagger UI allows users to explore and test all API endpoints directly from the browser.

