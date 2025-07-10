import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    contact: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (!formData.contact.trim()) newErrors.contact = 'Contact number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const data = new FormData();
        data.append("name", formData.username);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("contact", formData.contact);
        data.append("address", formData.address);

        const response = await fetch("http://localhost:3001", {
          method: "POST",
          body: data,
        });

        if (response.ok) {
          setSuccess("Registration Successful!");
          setFormData({
            username: '',
            email: '',
            password: '',
            contact: '',
            address: '',
          });
          setErrors({});
          window.location.href = "/login";
        } else {
          setSuccess("Registration Failed. Server Error.");
        }
      } catch (error) {
        console.error("Error:", error);
        setSuccess("Registration Failed. Network Error.");
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        minHeight: '100vh',
      }}
    >
      <div
        className="card shadow-lg p-4 w-100"
        style={{
          maxWidth: '450px',
          borderRadius: '20px',
          backgroundColor: '#ffffff',
        }}
      >
        <h3 className="text-center mb-4 text-primary fw-bold">Register</h3>
        {success && (
          <div className="alert alert-info text-center">{success}</div>
        )}
        <form onSubmit={handleSubmit} noValidate>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          {/* Contact */}
          <div className="mb-3">
            <label className="form-label">Contact No</label>
            <input
              type="number"
              className={`form-control ${errors.contact ? 'is-invalid' : ''}`}
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter your contact number"
            />
            {errors.contact && (
              <div className="invalid-feedback">{errors.contact}</div>
            )}
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea
              className={`form-control ${errors.address ? 'is-invalid' : ''}`}
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
            />
            {errors.address && (
              <div className="invalid-feedback">{errors.address}</div>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>

          {/* Redirect */}
          <p className="text-center mt-3 small">
            Already have an account?{' '}
            <a href="/login" className="text-decoration-none text-primary">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
