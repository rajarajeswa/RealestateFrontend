import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router-dom';

const Buy = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    propertyImages: null
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/buy')
      .then(res => res.json())
      .then(data => setProperties(data))
      .catch(err => console.error('Error fetching properties:', err));
  }, []);

  const openModal = (property) => {
    setSelectedProperty(property);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => {
      const modalElement = document.getElementById('contactModal');
      if (modalElement) {
        new window.bootstrap.Modal(modalElement).show();
      }
    }, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('buy', formData.buy);
    formDataToSend.append('message', formData.message);

    fetch('http://localhost:3000/buy', {
      method: 'POST',
      body: formDataToSend
    })
      .then((res) => res.text())
      .then((data) => {
        console.log('✅ Inquiry sent:', data);
        alert('Inquiry submitted successfully!');
        const modal = window.bootstrap.Modal.getInstance(document.getElementById('contactModal'));
        modal.hide();
      })
      .catch((err) => {
        console.error('❌ Error sending inquiry:', err);
        alert('Failed to send inquiry.');
      });
  };

  const handleBack = () => {
    navigate("/home");

  };

  return (
    <div className="container-fluid my-5">
      <div className="d-flex flex-column gap-3">
        <h2 className="mb-4 text-primary text-center fw-bold">Available Properties</h2>
        <button
          onClick={handleBack}
          className="btn btn-outline-primary mb-3"
          style={{ width: '15%', marginLeft: '200px' }}
        >
          ← Return Back
        </button>

        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property.id} className="card shadow-sm p-3 w-75 mx-auto">
              <div className="row g-3 align-items-center">
                {/* ✅ Fixed Image Display */}
                <div className="col-md-4">
                  {property.propertyImages && property.propertyImages.length > 0 ? (
  <img
    src={`http://localhost:3001/uploads/${property.propertyImages[0]}`} // adjust port
    alt={property.propertyTitle}
    className="img-fluid rounded"
    style={{ height: '200px', objectFit: 'cover', width: '100%' }}
  />
) : (
  <img
    src="https://via.placeholder.com/400x200?text=No+Image"
    alt="No Image"
    className="img-fluid rounded"
    style={{ height: '200px', objectFit: 'cover', width: '100%' }}
  />
)}

                </div>

                {/* Property Info */}
                <div className="col-md-8">
                  <h5>{property.propertyTitle}</h5>
                  <p><strong>Area:</strong> {property.area} sq.ft</p>
                  <p><strong>Bedrooms:</strong> {property.bedrooms} | <strong>Bathrooms:</strong> {property.bathrooms}</p>
                  <p><strong>Price:</strong> ₹{property.propertyPrice}</p>
                  <p><strong>Status:</strong> {property.propertyStatus}</p>
                  <p><strong>Location:</strong> {property.propertyLocation}</p>

                  <div className="mt-3 d-flex gap-2 justify-content-center">
                    <button
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#contactModal"
                      onClick={() => setSelectedProperty(property)}
                    >
                      Contact Agent
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted">No properties found.</div>
        )}
      </div>

      {/* Contact Modal */}
      <div className="modal fade" id="contactModal" tabIndex="-1" aria-labelledby="contactModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <form onSubmit={handleSubmit}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Contact Agent - {selectedProperty?.propertyTitle}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label>Name</label>
                  <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input type="email" className="form-control" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label>Phone</label>
                  <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label>Buy or Rent?</label><br />
                  <input type="radio" name="buy" value="Buy" onChange={handleInputChange} required /> Buy<br />
                  <input type="radio" name="buy" value="Rent" onChange={handleInputChange} required /> Rent
                </div>
                <div className="mb-3">
                  <label>Message</label>
                  <textarea className="form-control" name="message" rows="3" value={formData.message} onChange={handleInputChange}></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success w-100">Submit Inquiry</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Buy;
