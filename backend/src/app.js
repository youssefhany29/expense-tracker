const express = require("express");
const cors = require("cors");

console.log("Swagger loaded with files:", require("path").resolve("./routes/*.js"));
const expenseRoutes = require("./routes/expense.routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger/swagger.config");
const errorHandler = require("./middleware/errorHandler");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/expenses", expenseRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
    res.send("Expense Tracker API is running");
});

app.use(errorHandler);

app.listen(5000, () => {
    const host = "http://localhost:5000";

    console.log(`Server running at: ${host}`);
    console.log(`Swagger Docs available at: ${host}/api-docs`);
    console.log(`API Base URL: ${host}/api/expenses`);
});
