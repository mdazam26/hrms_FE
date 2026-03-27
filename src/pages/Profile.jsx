import { useEffect, useState } from "react";
import { getMyProfileApi, updateProfilePhotoApi } from "../api/employeeApi";
import { useAuth } from "../auth/AuthContext";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    if (["SUPER_ADMIN", "TENANT"].includes(user.role)) {
      return;
    }

    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getMyProfileApi();
      const data = res.data.data;
      setProfile(data);

      // 🔥 Fetch image properly with credentials
      if (data.profilePhotoUrl) {
        try {
              const imageRes = await fetch(
      data.profilePhotoUrl,
      {
        credentials: "include",
      }
    );


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
      } else {
        setPhotoUrl(null);
      }
    } catch (err) {
      console.error("Failed to load profile", err);
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
    });
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file");

    try {
      const base64 = await convertToBase64(selectedFile);
      await updateProfilePhotoApi(base64);

      alert("Profile photo updated successfully");

      await loadProfile(); // reload everything
    } catch (err) {
      console.error(err);
      alert("Failed to upload photo");
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (!profile) return <div>No profile data</div>;

  if (["SUPER_ADMIN", "TENANT"].includes(user.role)) {
    return <div>Profile not available for your role.</div>;
  }

  return (
    <div>
      <h2>My Profile</h2>

      {/* ================= PHOTO SECTION ================= */}
      <h3>Profile Photo</h3>

      <div style={{ marginBottom: "15px" }}>
        {photoUrl ? (
          <img
            src={photoUrl}
            alt="Profile"
            width="120"
            height="120"
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              border: "1px solid #ccc",
            }}
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
              fontSize: "40px",
            }}
          >
            👤
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setSelectedFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>Upload Photo</button>

      {/* ================= BASIC INFO ================= */}
      <h3>Basic Info</h3>
      <p><b>Employee Code:</b> {profile.employeeCode}</p>
      <p><b>Full Name:</b> {profile.fullName}</p>
      <p><b>Role:</b> {profile.role}</p>
      <p><b>Status:</b> {profile.employeeStatus}</p>
      <p><b>Official Email:</b> {profile.officialEmail}</p>
      <p><b>Nationality:</b> {profile.nationality}</p>

      {/* ================= WORK INFO ================= */}
      <h3>Work Info</h3>
      <p><b>Department:</b> {profile.department}</p>
      <p><b>Designation:</b> {profile.designation}</p>
      <p><b>Employment Type:</b> {profile.employmentType}</p>
      <p><b>Work Location:</b> {profile.workLocation}</p>
      <p><b>Date of Joining:</b> {profile.employmentStartDate}</p>

      {/* ================= PERSONAL INFO ================= */}
      <h3>Personal Info</h3>
      <p><b>Gender:</b> {profile.gender}</p>
      <p><b>Date of Birth:</b> {profile.dateOfBirth}</p>
      <p><b>Personal Email:</b> {profile.personalEmail}</p>
      <p><b>Personal Mobile:</b> {profile.personalMobile}</p>

      {/* ================= IDENTITY ================= */}
      <h3>Identity</h3>
      <p><b>PAN Number:</b> {profile.panNumber}</p>
      <p><b>Aadhaar Number:</b> {profile.aadhaarNumber}</p>

      {/* ================= SALARY ================= */}
      <h3>Salary</h3>
      <p><b>Gross Salary:</b> ₹{profile.grossSalary}</p>
      <p><b>Net Salary:</b> ₹{profile.netSalary}</p>
    </div>
  );
};

export default Profile;