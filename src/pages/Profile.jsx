import { useEffect, useState } from "react";
import { getMyProfileApi } from "../api/employeeApi";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await getMyProfileApi();
        setProfile(res.data.data);
      } catch (err) {
        console.error("Failed to load profile", err);
        alert("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) return <div>Loading profile...</div>;
  if (!profile) return <div>No profile data</div>;

  return (
    <div>
      <h2>My Profile</h2>

      <h3>Basic Info</h3>
      <p><b>Employee Code:</b> {profile.employeeCode}</p>
      <p><b>Full Name:</b> {profile.fullName}</p>
      <p><b>Role:</b> {profile.role}</p>
      <p><b>Status:</b> {profile.employeeStatus}</p>
      <p><b>Official Email:</b> {profile.officialEmail}</p>
      <p><b>Nationality:</b> {profile.nationality}</p>

      <h3>Work Info</h3>
      <p><b>Department:</b> {profile.department}</p>
      <p><b>Designation:</b> {profile.designation}</p>
      <p><b>Employment Type:</b> {profile.employmentType}</p>
      <p><b>Work Location:</b> {profile.workLocation}</p>
      <p><b>Date of Joining:</b> {profile.employmentStartDate}</p>

      <h3>Personal Info</h3>
      <p><b>Gender:</b> {profile.gender}</p>
      <p><b>Date of Birth:</b> {profile.dateOfBirth}</p>
      <p><b>Personal Email:</b> {profile.personalEmail}</p>
      <p><b>Personal Mobile:</b> {profile.personalMobile}</p>

      <h3>Identity</h3>
      <p><b>PAN Number:</b> {profile.panNumber}</p>
      <p><b>Aadhaar Number:</b> {profile.aadhaarNumber}</p>

      <h3>Salary</h3>
      <p><b>Gross Salary:</b> ₹{profile.grossSalary}</p>
      <p><b>Net Salary:</b> ₹{profile.netSalary}</p>
    </div>
  );
};

export default Profile;
