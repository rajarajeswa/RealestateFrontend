import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    try {
      const data = new FormData();
      data.append("email", formData.email);
      data.append("password", formData.password);

      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        body: data,
      });
      

      const result = await response.json(); // 👈 parse response

      if (response.ok) {
        console.log("✅ Token received:", result.token); // 👈 view token

        setSuccess("LOGIN Successful!");
        setFormData({ email: '', password: '' });
        setErrors({});

        // Save the token in localStorage (optional)
        localStorage.setItem("token", result.token);

        // Redirect
        window.location.href = "/home";
      } else {
        console.warn("❌ Server response error:", result);
        setSuccess("LOGIN Failed. " + result.message || "Server Error.");
      }
    } catch (error) {
      console.error("❌ Network error:", error);
      setSuccess("LOGIN Failed. Network Error.");
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
        <h3 className="text-center mb-4 text-primary fw-bold">Login</h3>
        {success && (
          <div className="alert alert-info text-center">{success}</div>
        )}
        <form onSubmit={handleSubmit} noValidate>
         

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

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>

          {/* Redirect */}
          <p className="text-center mt-3 small">
            Create an account?{' '}
            <a href="/" className="text-decoration-none text-primary">
              Create here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
