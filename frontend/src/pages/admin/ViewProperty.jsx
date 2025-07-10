import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const ViewProperty = () => {
  const [property, setProperty] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch('http://localhost:3001/view', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          setProperty(data);
        } else if (res.status === 401 || res.status === 403) {
          alert("🔐 Access Denied. Please log in.");
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else {
          alert("❌ Something went wrong.");
        }
      })
      .catch((err) => {
        console.error("⚠️ Network Error:", err);
        alert("Network error");
      });
  }, []);

  const handleBack = () => {
    navigate("/admin-options");
  };

  return (
    <div className="container-fluid my-5">
      

      {property.length === 0 ? (
        <div className="text-center text-muted">No properties available.</div>
      ) : (
        <div className="row g-4">
          <h3 className="text-center mb-4 fw-bold text-info">
        Property Listings
      </h3>

      <div className="text-center mb-4">
        <button onClick={handleBack} className="btn btn-outline-primary" style={{marginRight:"50px"}}>
          ← Return Back
        </button>
      </div>
          {property.map((p) => (
  <div className="col-12 mb-4" key={p.id}>
    <div className="card shadow d-flex flex-column flex-md-row h-100">
      {/* Image Section */}
      {p.propertyImages ? (
        <div className="col-md-4">
          <img
src={`/uploads/${p.propertyImages}`}
            alt="Property"
            className="img-fluid h-100 w-100 object-fit-cover rounded-start"
            style={{ maxHeight: "300px", objectFit: "cover" }}
          />
        </div>
      ) : (
        <div className="col-md-4 d-flex align-items-center justify-content-center bg-light text-muted" style={{ minHeight: "300px" }}>
          No Image
        </div>
      )}

      {/* Content Section */}
      <div className="card-body col-md-8">
        <h5 className="card-title text-primary">{p.propertyTitle}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {p.propertyType} - ₹{p.propertyPrice}
        </h6>

        <div className="row">
          <div className="col-sm-6">
            <p className="mb-3"><strong>Status:</strong> <span className="badge bg-info text-dark">{p.propertyStatus}</span></p>
            <p className="mb-3"><strong>Bedrooms:</strong> {p.bedrooms}</p>
            <p className="mb-3"><strong>Area:</strong> {p.area} sqft ({p.propertyLength}x{p.propertyBreadth})</p>
            <p className="mb-3"><strong>Facing:</strong> {p.facing}</p>
            <p className="mb-3"><strong>Furnishing:</strong> {p.furnishing}</p>
            <p className="mb-3"><strong>Water Supply:</strong> {p.waterSupply}</p>
            <p className="mb-3"><strong>Property Age:</strong> {p.propertyAge} years</p>
          </div>
          <div className="col-sm-6">
            <p className="mb-3">
              <strong>Location:</strong> {p.propertyAddress}, {p.landmark}, {p.propertyCity}, {p.propertyState} - {p.pincode}
            </p>
            <p className="mb-3"><strong>Road Access:</strong> {p.roadFacility}</p>
            <p className="mb-3"><strong>Transport:</strong> {p.publicTransport}</p>
            <p className="mb-3"><strong>Description:</strong> {p.propertyDescription}</p>
            <p className="mb-3"><strong>Agent:</strong> {p.propertyAgent}</p>
            <p className="mb-3"><strong>Listed on:</strong> {p.propertyDate}</p>
          </div>
        </div>

        {p.propertyImages && (
          <a
href={`/uploads/${p.propertyImages}`}
            download
            className="btn btn-sm btn-outline-success mt-3"
            target="_blank"
            
          >
            Download Image
          </a>
        )}
      </div>

      {/* Footer */}
      <div className="card-footer text-muted text-end w-100">
        Created: {new Date(p.createdAt).toLocaleDateString()}
      </div>
    </div>
  </div>
))}

        </div>
      )}
    </div>
  );
};

export default ViewProperty;
