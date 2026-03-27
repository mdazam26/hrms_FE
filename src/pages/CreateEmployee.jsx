import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEmployeeApi } from "../api/employeeApi";
import { useAuth } from "../auth/AuthContext";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    officialEmail: "",
    role: 3, // default EMPLOYEE roleId

    designation: "",
    department: "",
    employmentType: "FULL_TIME",

    dateOfJoining: "",
    workLocation: "",

    gender: "Male",
    dateOfBirth: "",

    nationality: "Indian",

    personalMobile: "",
    personalEmail: "",

    panNumber: "",
    aadhaarNumber: "",

    salary: 0,
    password: "1234",

    reportingManagerId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "role" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createEmployeeApi({
        ...form,
        salary: Number(form.salary),
      });

      navigate("/employees");
    } catch (err) {
      console.error("Create employee failed", err);
      alert("Validation failed. Please check all required fields.");
    }
  };

  return (
    <div>
      <h2>Create Employee</h2>

      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First Name" required onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" required onChange={handleChange} />
        <input name="officialEmail" placeholder="Official Email" required onChange={handleChange} />

        <input name="designation" placeholder="Designation" required onChange={handleChange} />
        <input name="department" placeholder="Department" required onChange={handleChange} />
        <input name="workLocation" placeholder="Work Location" required onChange={handleChange} />

        <label>Role</label>
        <select name="role" value={form.role} onChange={handleChange}>
          {/* ADMIN only visible to TENANT & ADMIN */}
          {(user.role === "TENANT" || user.role === "ADMIN") && (
            <option value={1}>ADMIN</option>
          )}
          <option value={2}>HR</option>
          <option value={3}>EMPLOYEE</option>
        </select>

        <label>Date of Joining</label>
        <input type="date" name="dateOfJoining" required onChange={handleChange} />

        <label>Date of Birth</label>
        <input type="date" name="dateOfBirth" onChange={handleChange} />

        <input
          name="personalMobile"
          placeholder="Personal Mobile"
          required
          pattern="\d{10}"
          onChange={handleChange}
        />

        <input
          name="personalEmail"
          placeholder="Personal Email"
          onChange={handleChange}
        />

        <input name="panNumber" placeholder="PAN Number" required onChange={handleChange} />
        <input name="aadhaarNumber" placeholder="Aadhaar Number" required onChange={handleChange} />

        <input type="number" name="salary" placeholder="Salary" required onChange={handleChange} />

        <input
          name="reportingManagerId"
          placeholder="Reporting Manager ID"
          onChange={handleChange}
        />

        <button type="submit">Create Employee</button>
      </form>
    </div>
  );
};

export default CreateEmployee;