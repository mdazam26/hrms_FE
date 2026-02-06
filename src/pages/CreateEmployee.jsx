import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEmployeeApi } from "../api/employeeApi";

const CreateEmployee = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    officialEmail: "",
    role: "EMPLOYEE",

    designation: "",
    department: "",
    employmentType: "FULL_TIME",

    dateOfJoining: "",        // REQUIRED (LocalDate)
    workLocation: "",

    gender: "Male",
    dateOfBirth: "",

    nationality: "Indian",

    personalMobile: "",       // REQUIRED (10 digits)
    personalEmail: "",

    panNumber: "",            // REQUIRED
    aadhaarNumber: "",        // REQUIRED

    salary: 0,
    password: "1234",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createEmployeeApi({
        ...form,
        salary: Number(form.salary),   // ensure number
      });

      // ✅ Redirect back to list
      navigate("/employees");
    } catch (err) {
      console.error("Create employee failed", err);
      alert("Validation failed. Please fill all required fields.");
    }
  };

  return (
    <div>
      <h2>Create Employee</h2>

      <form onSubmit={handleSubmit}>
        {/* BASIC */}
        <input name="firstName" placeholder="First Name" required onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" required onChange={handleChange} />
        <input name="officialEmail" placeholder="Official Email" required onChange={handleChange} />

        {/* WORK */}
        <input name="designation" placeholder="Designation" required onChange={handleChange} />
        <input name="department" placeholder="Department" required onChange={handleChange} />
        <input name="workLocation" placeholder="Work Location" required onChange={handleChange} />
        <label>Role</label>
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="EMPLOYEE">EMPLOYEE</option>
          <option value="HR">HR</option>
        </select>

        <label>Date of Joining</label>
        <input
          type="date"
          name="dateOfJoining"
          required
          onChange={handleChange}
        />

        {/* PERSONAL */}
        <label>Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          onChange={handleChange}
        />

        <input
          name="personalMobile"
          placeholder="Personal Mobile (10 digits)"
          required
          pattern="\d{10}"
          onChange={handleChange}
        />

        <input
          name="personalEmail"
          placeholder="Personal Email"
          onChange={handleChange}
        />

        {/* IDENTITY (CRITICAL) */}
        <input
          name="panNumber"
          placeholder="PAN Number"
          required
          onChange={handleChange}
        />

        <input
          name="aadhaarNumber"
          placeholder="Aadhaar Number"
          required
          onChange={handleChange}
        />

        {/* SALARY */}
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          required
          onChange={handleChange}
        />

        <button type="submit">Create Employee</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
