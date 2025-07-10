import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // Import React Router's navigation hook


const Users = () => {
  const [users, setUsers] = useState([]);
    const navigate = useNavigate(); // Initialize navigation
  

  const token = localStorage.getItem('token');

useEffect(() => {
  const token = localStorage.getItem("token");

  fetch("http://localhost:3001/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => {
      if (res.status === 200) {
        const data = await res.json();
        console.log("✅ Users:", data);
      } else if (res.status === 401 || res.status === 403) {
        // Token missing or invalid
        alert("🔐 Access Denied. Please log in.");
        localStorage.removeItem("token");
        window.location.href = "/login"; // Go to login
      } else {
        alert("Unexpected error occurred");
      }
    })
    .catch((err) => {
      console.error("⚠️ Fetch failed:", err);
      alert("Network error");
    });
}, []);



  const handleBack = () => {
    navigate("/admin-options"); // This navigates back to the previous page
    // OR: navigate('/'); // If you want to go to home page
  };


  return (
    <div className="container-fluid my-5">

      {users.length > 0 ? (
        <div className="table-responsive mb-4 w-100">
                <h2 className="text-center mb-4 fw-bold" style={{ color: "#006770" }}>Registered Users</h2>
                 {/* Return Back Button */}
      <button onClick={handleBack} className="btn btn-outline-primary mb-3">
        ← Return Back
      </button>

          <table className="table table-striped table-bordered table-hover shadow-sm">
            <thead className="table-success">
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Registered On</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td style={{ color: "#006770", fontWeight: "bold" }}>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.created_at}</td>
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
