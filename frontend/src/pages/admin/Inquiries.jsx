import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // Import React Router's navigation hook


const Users = () => {
  const [inquiries, setInquiries] = useState([]);
    const navigate = useNavigate(); // Initialize navigation
    const token = localStorage.getItem('token'); // ✅ Get stored token

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("🔒 No token found. Please log in first.");
    window.location.href = "/"; // or redirect to login page
    return;
  }

  fetch("http://localhost:3001/inquiries", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      } else if (res.status === 401 || res.status === 403) {
        alert("❌ Access Denied: Invalid or expired token.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        alert("⚠️ Something went wrong.");
      }
    })
    .catch((err) => {
      console.error("Error fetching inquiries:", err);
      alert("❌ Network error while fetching data.");
    });
}, []);


  const handleBack = () => {
    navigate("/admin-options"); // This navigates back to the previous page
    // OR: navigate('/'); // If you want to go to home page
  };


  return (
    <div className="container-fluid mt-0 mb-4">

      {inquiries.length > 0 ? (
        <div className="table-responsive mb-4 w-100">
                <h2 className="text-center mb-4 fw-bold" style={{ color: "#006770" }}>Inquires</h2>
                 {/* Return Back Button */}
      <button onClick={handleBack} className="btn btn-outline-primary mb-3">
        ← Return Back
      </button>

          <table className="table table-striped table-bordered table-hover shadow-sm">
            <thead className="table-success">
              <tr>
                <th>Id</th>

                <th>User name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Mode</th>
                <th>Message</th>
                <th>Date</th> {/* NEW COLUMN */}


              </tr>
            </thead>
            <tbody>
              {inquiries.map(inq => (
                <tr key={inq.id}>
                  <td style={{ color: "#006770", fontWeight: "bold" }}>{inq.id}</td>
                  <td>{inq.name}</td>
                  <td>{inq.email}</td>
                  <td>{inq.phone}</td>
                <td>{inq.buy}</td>
                <td>{inq.message}</td>
                <td>{new Date(inq.created_at).toLocaleString()}</td> {/* NEW */}



                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-muted">No users found.</div>
      )}
    </div>
  );
};

export default Users;
