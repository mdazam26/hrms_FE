import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeByIdApi } from "../api/employeeApi";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployee();
  }, [id]);

  const loadEmployee = async () => {
    try {
      const res = await getEmployeeByIdApi(id);
      const data = res.data.data;

      setEmployee(data);

      if (data.profilePhotoUrl) {
        try {
          const imageRes = await fetch(data.profilePhotoUrl, {
            credentials: "include",
          });

          if (imageRes.ok) {
            const blob = await imageRes.blob();
            const objectUrl = URL.createObjectURL(blob);
            setPhotoUrl(objectUrl);
          } else {
            setPhotoUrl(null);
          }
        } catch {
          setPhotoUrl(null);
        }
      }
    } catch (err) {
      console.error("Failed to load employee", err);
      alert("Failed to load employee");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading employee...</div>;
  if (!employee) return <div>No employee data</div>;

  return (
    <div>
      <h2>Employee Details</h2>

      {/* Photo */}
      <div style={{ marginBottom: 20 }}>
        {photoUrl ? (
          <img
            src={photoUrl}
            alt="profile"
            width="120"
            height="120"
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "#eee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
            }}
          >
            👤
          </div>
        )}
      </div>

      <p><b>Code:</b> {employee.employeeCode}</p>
      <p><b>Name:</b> {employee.fullName}</p>
      <p><b>Email:</b> {employee.officialEmail}</p>
      <p><b>Role:</b> {employee.role}</p>
      <p><b>Status:</b> {employee.employeeStatus}</p>
      <p><b>Department:</b> {employee.department}</p>
      <p><b>Designation:</b> {employee.designation}</p>
      <p><b>Work Location:</b> {employee.workLocation}</p>
      <p><b>Date of Joining:</b> {employee.employmentStartDate}</p>
    </div>
  );
};

export default EmployeeDetails;