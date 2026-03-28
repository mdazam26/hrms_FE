import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllEmployeesPaginatedApi,
  getProfilePhotoApi,
} from "../api/employeeApi";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [photos, setPhotos] = useState({});
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployees();
  }, [page]);

  // ✅ Cleanup old blob URLs (prevent memory leaks)
  useEffect(() => {
    return () => {
      Object.values(photos).forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [photos]);

  const loadEmployees = async () => {
    try {
      setLoading(true);

      const res = await getAllEmployeesPaginatedApi({
        page,
        size,
      });

      const data = res.data.data.content;
      setEmployees(data);

      // ✅ Load photos using axios (Bearer token)
      await loadPhotos(data);

    } catch (err) {
      console.error("Failed to load employees", err);
      alert("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const loadPhotos = async (employeesList) => {
    const photoMap = {};

    await Promise.all(
      employeesList.map(async (emp) => {
        if (!emp.employeeId) return;

        try {
          const res = await getProfilePhotoApi(emp.employeeId);
          const url = URL.createObjectURL(res.data);
          photoMap[emp.employeeId] = url;
        } catch {
          // ignore if no photo
        }
      })
    );

    setPhotos(photoMap);
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
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
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