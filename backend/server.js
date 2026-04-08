const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

const data = JSON.parse(fs.readFileSync("data.json"));
const PORT = process.env.PORT || 5000;

const calculateSalary = (emp) => {
    const gross = emp.hourly_rate * emp.hours_worked;
    const net = gross * (1 - emp.tax_rate);

    return {
        ...emp,
        gross_salary: gross.toFixed(2),
        net_salary: net.toFixed(2)
    };
};

app.get("/employees", (req, res) => {
    const result = data.map(calculateSalary);
    res.json(result);
});

app.get("/employees/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const emp = data.find(e => e.id === id);

    if (!emp) {
        return res.status(404).json({ message: "Employee not found" });
    }

    res.json(calculateSalary(emp));
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});