import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllEmployeesApi } from "../api/employeeApi";

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await getAllEmployeesApi();
      setEmployees(res.data.data);
    };
    load();
  }, []);

  return (
    <div>
      <h2>Employees</h2>

      <Link to="/employees/create">
        <button>Create Employee</button>
      </Link>

      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.employeeId}>
              <td>{e.employeeCode}</td>
              <td>{e.fullName}</td>
              <td>{e.officialEmail}</td>
              <td>{e.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
