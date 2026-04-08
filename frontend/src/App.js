import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/employees")
    .then(res => setEmployees(res.data))
    .catch(err => console.log(err));
  },[]);

  return (
    <div>
      <h1>Payroll Management</h1>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Hourly Rate</th>
            <th>Hours Worked</th>
            <th>Gross Pay</th>
            <th>Net Pay</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.hourly_rate}</td>
              <td>{employee.hours_worked}</td>
              <td>{employee.gross_salary}</td>
              <td>{employee.net_salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App;