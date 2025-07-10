import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const ViewProperty = () => {
  const [property, setProperty] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterType, setFilterType] = useState("");
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
          setFilteredProperties(data);
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

  useEffect(() => {
    let filtered = [...property];

    if (filterCity) {
      filtered = filtered.filter(p => p.propertyCity === filterCity);
    }

    if (filterType) {
      filtered = filtered.filter(p => p.propertyType === filterType);
    }

    if (sortOption === "price-asc") {
      filtered.sort((a, b) => a.propertyPrice - b.propertyPrice);
    } else if (sortOption === "price-desc") {
      filtered.sort((a, b) => b.propertyPrice - a.propertyPrice);
    } else if (sortOption === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredProperties(filtered);
  }, [sortOption, filterCity, filterType, property]);

  const handleBack = () => {
    navigate("/admin-options");
  };

  const uniqueCities = [...new Set(property.map(p => p.propertyCity))];
  const uniqueTypes = [...new Set(property.map(p => p.propertyType))];

  return (
    <div className="container-fluid my-5">
      <h3 className="text-center mb-4 fw-bold text-info">Find your desired property</h3>

      <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
        <button onClick={handleBack} className="btn btn-outline-primary">
          ← Return Back
        </button>

        <select className="form-select w-auto" value={filterCity} onChange={(e) => setFilterCity(e.target.value)}>
          <option value="">Filter by City</option>
          {uniqueCities.map((city, idx) => (
            <option key={idx} value={city}>{city}</option>
          ))}
        </select>

        <select className="form-select w-auto" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="">Filter by Type</option>
          {uniqueTypes.map((type, idx) => (
            <option key={idx} value={type}>{type}</option>
          ))}
        </select>

        <select className="form-select w-auto" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Sort By</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

      {filteredProperties.length === 0 ? (
        <div className="text-center text-muted">No properties available.</div>
      ) : (
        <div className="row g-4">
          {filteredProperties.map((p) => (
            <div className="col-md-6 col-lg-4" key={p.id}>
              <div className="card shadow h-100">
                <img
                  src={`http://localhost:3001/uploads/${p.propertyImages}`}
                  alt="Property"
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <div className="card-body">
                  <h5 className="card-title text-primary">{p.propertyTitle}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {p.propertyType} - ₹{p.propertyPrice}
                  </h6>
                  <p className="mb-2"><strong>Location:</strong> {p.propertyCity}, {p.propertyState}</p>
                  <p className="mb-2"><strong>Status:</strong> <span className="badge bg-info text-dark">{p.propertyStatus}</span></p>
                  <p className="mb-2"><strong>Bedrooms:</strong> {p.bedrooms}</p>
                  <p className="mb-2"><strong>Area:</strong> {p.area} sqft</p>
                </div>

                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(p.propertyAddress)},${encodeURIComponent(p.propertyCity)}&output=embed`}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>

                <div className="card-footer text-muted text-end">
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
