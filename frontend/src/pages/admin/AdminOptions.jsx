import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // Import React Router's navigation hook


function AdminOptions() {
      const navigate = useNavigate(); // Initialize navigation
      const handleBack = () => {
    navigate("/home"); // This navigates back to the previous page
    // OR: navigate('/'); // If you want to go to home page
  };


  
  return (
    <div className="container mt-5">
      <div className="row">
              <h2 className="text-center mb-4 mt-5">Admin Dashboard</h2>
              {/* Return Back Button */}
      <div className="d-flex justify-content-start mb-3">
  <button onClick={handleBack} className="btn btn-outline-primary">
    ← Return Back
  </button>
</div>




        {/* Add Property */}
        <div className="col-md-5 mb-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <img src="https://img.icons8.com/fluency-systems-filled/96/26c6da/home.png" alt="icon" className="img-fluid mb-2" style={{ width: '60px', height: '60px' }} />

              <h5 className="card-title">Add Property</h5>
              <p className="card-text">Add a new property listing.</p>
              <Link to="/admin" className="btn" style={{color:"#064d51"}}>Go</Link>
            </div>
          </div>
        </div>

        {/* View Properties */}
        <div className="col-md-5 mb-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <img src="https://img.icons8.com/fluency-systems-filled/96/26c6da/property.png" alt="icon" className="img-fluid mb-2" style={{ width: '60px', height: '60px' }} />

              <h5 className="card-title">View Properties</h5>
              <p className="card-text">See all added properties.</p>
              <Link to="/view" className="btn" style={{color:"#064d51"}}>Go</Link>
            </div>
          </div>
        </div>

        {/* Users */}
        <div className="col-md-5 mb-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <img src="https://cdn-icons-png.freepik.com/512/6322/6322558.png" alt="icon" className="img-fluid mb-2" style={{ width: '60px', height: '60px' }} />

              <h5 className="card-title">Users</h5>
              <p className="card-text">View registered users.</p>
              <Link to="/users" className="btn" style={{color:"#064d51"}}>Go</Link>
            </div>
          </div>
        </div>

        {/* Inquiries */}
        <div className="col-md-5 mb-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <img src="https://img.icons8.com/fluency-systems-filled/96/26c6da/help.png" alt="icon" className="img-fluid mb-2" style={{ width: '60px', height: '60px' }} />

              <h5 className="card-title">Inquiries</h5>
              <p className="card-text">Check customer inquiries.</p>
              <Link to="/inquiries" className="btn"style={{color:"#064d51"}}>Go</Link>
            </div>
          </div>
        </div>

         {/* Update status */}
        <div className="col-md-5 mb-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <img src="https://img.icons8.com/fluency-systems-filled/96/26c6da/edit.png" alt="icon" className="img-fluid mb-2" style={{ width: '60px', height: '60px' }} />

              <h5 className="card-title">Update details</h5>
              <p className="card-text">Update property status.</p>
              <Link to="/inquiries" className="btn" style={{color:"#064d51"}}>Go</Link>
            </div>
          </div>
        </div>
        <div className="col-md-5 mb-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <img src="https://img.icons8.com/fluency-systems-filled/96/26c6da/edit.png" alt="icon" className="img-fluid mb-2" style={{ width: '60px', height: '60px' }} />

              <h5 className="card-title">Session</h5>
              <p className="card-text">View details of user logs.</p>
              <Link to="/inquiries" className="btn" style={{color:"#064d51"}}>Go</Link>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}

export default AdminOptions;
