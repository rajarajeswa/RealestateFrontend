import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    propertyTitle: '',
    propertyType: '',
    propertyStatus: '',
    propertyPrice: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    propertyLength: '',
    propertyBreadth: '',
    propertyAddress: '',
    propertyCity: '',
    propertyState: '',
    pincode: '',
    landmark: '',
    facing: '',
    roadFacility: '',
    publicTransport: '',
    waterSupply: '',
    furnishing: '',
    propertyAge: '',
    propertyDescription: '',
    propertyAgent: '',
    propertyDate: '',
    propertyImages: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'propertyImages') {
      setFormData(prev => ({ ...prev, [name]: files }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleBack = () => {
    navigate("/admin-options");
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const form = new FormData();

  for (const key in formData) {
    if (key === 'propertyImages' && formData[key]) {
      for (let i = 0; i < formData[key].length; i++) {
        form.append('propertyImages', formData[key][i]);
      }
    } else {
      form.append(key, formData[key]);
    }
  }

  const token = localStorage.getItem('token'); // ✅ Get JWT from storage

  try {
    const res = await fetch('http://localhost:3001/admin', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}` // ✅ Send token here
        // Note: No 'Content-Type' when using FormData
      },
      body: form
    });

    const text = await res.text();
    alert(text);
  } catch (error) {
    console.error('❌ Error:', error);
    alert('Upload failed');
  }
};

  return (
    <div className="container-fluid mt-4 mb-5">
      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
        <h2 className="mb-4 text-center">Add New Property</h2>

        <button onClick={handleBack} type="button" className="btn btn-outline-primary mb-4">
          ← Return Back
        </button>

        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" name="propertyTitle" className="form-control" onChange={handleChange} required />
        </div>

        <div className="row">
          <div className="col-sm-6 mb-3">
            <label>Type</label>
            <input type="text" name="propertyType" placeholder="Ex: House, Apartment" className="form-control" onChange={handleChange} required />
          </div>
          <div className="col-sm-6 mb-3">
            <label>Status</label>
            <input type="text" name="propertyStatus" placeholder="Rent/Buy" className="form-control" onChange={handleChange} required />
          </div>
        </div>
        

        <div className="row">
          <div className="col-sm-4 mb-3">
            <label>Price</label>
            <input type="number" name="propertyPrice" className="form-control" onChange={handleChange} required />
          </div>
          <div className="col-sm-4 mb-3">
            <label>Bedrooms</label>
            <input type="number" name="bedrooms" className="form-control" onChange={handleChange} required />
          </div>
          <div className="col-sm-4 mb-3">
            <label>Bathrooms</label>
            <input type="number" name="bathrooms" className="form-control" onChange={handleChange} required />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 mb-3">
            <label>Area (sq ft)</label>
            <input type="number" name="area" className="form-control" onChange={handleChange} required />
          </div>
          <div className="col-sm-3 mb-3">
            <label>Length</label>
            <input type="number" name="propertyLength" className="form-control" onChange={handleChange} required />
          </div>
          <div className="col-sm-3 mb-3">
            <label>Breadth</label>
            <input type="number" name="propertyBreadth" className="form-control" onChange={handleChange} required />
          </div>
        </div>

        <div className="mb-3">
          <label>Address</label>
          <input type="text" name="propertyAddress" className="form-control" onChange={handleChange} required />
        </div>

        <div className="row">
          <div className="col-sm-4 mb-3">
            <label>City</label>
            <input type="text" name="propertyCity" className="form-control" onChange={handleChange} required />
          </div>
          <div className="col-sm-4 mb-3">
            <label>State</label>
            <input type="text" name="propertyState" className="form-control" onChange={handleChange} required />
          </div>
          <div className="col-sm-4 mb-3">
            <label>Pincode</label>
            <input type="text" name="pincode" className="form-control" onChange={handleChange} required />
          </div>
        </div>

        <div className="mb-3">
          <label>Nearby Landmark</label>
          <input type="text" name="landmark" className="form-control" onChange={handleChange} required />
        </div>

        <div className="row">
          <div className="col-sm-6 mb-3">
            <label>Facing</label>
            <select name="facing" className="form-select" onChange={handleChange}>
              <option value="">-- Select Facing --</option>
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="North-East">North-East</option>
              <option value="North-West">North-West</option>
              <option value="South-East">South-East</option>
              <option value="South-West">South-West</option>
            </select>
          </div>

          <div className="col-sm-6 mb-3">
            <label>Road Facility</label>
            <select name="roadFacility" className="form-select" onChange={handleChange}>
              <option value="">-- Select Road Type --</option>
              <option value="No Road Access">No Road Access</option>
              <option value="Mud Road">Mud Road</option>
              <option value="Gravel Road">Gravel Road</option>
              <option value="Cement Road">Cement Road</option>
              <option value="Tar Road">Tar Road</option>
              <option value="Highway Access">Highway Access</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 mb-3">
            <label>Public Transport Access</label>
            <select name="publicTransport" className="form-select" onChange={handleChange}>
              <option value="">-- Select --</option>
              <option value="None">None</option>
              <option value="Bus Only">Bus Only</option>
              <option value="Train Nearby">Train Nearby</option>
              <option value="Metro Nearby">Metro Nearby</option>
              <option value="Bus + Metro">Bus + Metro</option>
              <option value="All Options Available">All Options Available</option>
            </select>
          </div>

          <div className="col-sm-6 mb-3">
            <label>Water Supply</label>
            <select name="waterSupply" className="form-select" onChange={handleChange} required>
              <option value="">-- Select --</option>
              <option value="Municipal">Municipal</option>
              <option value="Borewell">Borewell</option>
              <option value="Both">Both</option>
              <option value="None">None</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label>Furnishing</label>
          <select name="furnishing" className="form-select" onChange={handleChange}>
            <option value="">-- Select --</option>
            <option value="Furnished">Furnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Unfurnished">Unfurnished</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Property Age</label>
          <input type="number" name="propertyAge" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea name="propertyDescription" className="form-control" rows="3" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Upload Images</label>
          <input type="file" name="propertyImages" className="form-control" multiple onChange={handleChange} />
        </div>

        <div className="row">
          <div className="col-sm-6 mb-3">
            <label>Agent</label>
            <input type="text" name="propertyAgent" className="form-control" onChange={handleChange} required />
          </div>
          <div className="col-sm-6 mb-3">
            <label>Date</label>
            <input type="date" name="propertyDate" className="form-control" onChange={handleChange} required />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">Add Property</button>
      </form>
    </div>
  );
}

export default AddProject;
