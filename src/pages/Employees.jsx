import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllEmployeesPaginatedApi } from "../api/employeeApi";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [photos, setPhotos] = useState({});
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployees();
  }, [page]);

  const loadEmployees = async () => {
    try {
      setLoading(true);

      const res = await getAllEmployeesPaginatedApi({
        page,
        size,
        // Optional filters:
        // employmentStartDate: "",
        // status: "",
        // roleId: "",
      });

      const data = res.data.data.content; // Spring pageable structure
      setEmployees(data);

      // 🔥 Load profile photos
      data.forEach(async (emp) => {
        if (emp.profilePhotoUrl) {
          try {
            const imageRes = await fetch(emp.profilePhotoUrl, {
              credentials: "include",
            });

            if (imageRes.ok) {
              const blob = await imageRes.blob();
              const objectUrl = URL.createObjectURL(blob);

              setPhotos((prev) => ({
                ...prev,
                [emp.employeeId]: objectUrl,
              }));
            }
          } catch {
            // ignore silently
          }
        }
      });
    } catch (err) {
      console.error("Failed to load employees", err);
      alert("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading employees...</div>;

  return (
    <div>
      <h2>Employees</h2>

      <Link to="/employees/create">
        <button>Create Employee</button>
      </Link>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Code</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.employeeId}>
              <td>
                {photos[e.employeeId] ? (
                  <img
                    src={photos[e.employeeId]}
                    alt="profile"
                    width="40"
                    height="40"
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                ) : (
                  "👤"
                )}
              </td>

              <td>{e.employeeCode}</td>

              <td>
                <Link to={`/employees/${e.employeeId}`}>
                  {e.fullName}
                </Link>
              </td>

              <td>{e.officialEmail}</td>
              <td>{e.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <button disabled={page === 0} onClick={() => setPage(page - 1)}>
        Previous
      </button>

      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default Employees;