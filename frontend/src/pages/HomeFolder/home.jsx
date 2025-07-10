import React from 'react';
import { Link } from 'react-router-dom';
import "../../index.css";

function Home() {
  return (
    <div className="home-wrapper">
      {/* Navbar */}
      <header className="navbar justify-content-center ">
  <div className="logo" style={{marginRight:"890px"}}>99Acres Real Estate</div>
  <nav className="nav-links ">
    <Link to="/">Home</Link>
    <Link to="/buy">Buy/Rent</Link>
    <Link to="/sell">Sell</Link>
    <Link to="/admin-options">Admin</Link>
    <Link to="/">Register</Link>
  </nav>
</header>


      {/* Hero Section */}
      <section className="hero-section">
        <h1>Find Your Dream Property</h1>
        <p>Search from thousands of listings across India</p>
        <div className="hero-buttons">
          <Link to="/properties" className="btn">Search Properties</Link>
          <Link to="/post-property" className="btn secondary">Post Your Property</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-card">
          <h3>Buy Property</h3>
          <p>Explore flats, villas, plots & more.</p>
        </div>
        <div className="feature-card">
          <h3>Rent Property</h3>
          <p>Find rental homes & commercial spaces.</p>
        </div>
        <div className="feature-card">
          <h3>Post Property</h3>
          <p>List your property for free & reach buyers.</p>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="featured-section">
        <h2>Featured Properties</h2>
        <div className="featured-properties">
          <div className="property-card">
            <img src="https://i.pinimg.com/originals/24/e8/f0/24e8f08ba83e34213572acbdb1061bf0.jpg" alt="Property 1" />
            <h4>3BHK Apartment in Delhi</h4>
            <p>₹85 Lakh</p>
          </div>
          <div className="property-card">
            <img src="https://www.lendlease.com/contentassets/302840d3bc9846579cb9f785ed8abb9a/luxury-interior-design.jpg" alt="Property 2" />
            <h4>Villa in Bangalore</h4>
            <p>₹2.5 Crore</p>
          </div>
          <div className="property-card">
            <img src="https://www.apartments.com/blog/sites/default/files/styles/large/public/image/2023-06/the-huntley-atlanta-ga-luxury-apartment-view.jpg?itok=l26TswZZ" alt="Property 3" />
            <h4>Plot in Chennai</h4>
            <p>₹45 Lakh</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonial">
          <p>"I found my dream home within a week. Great platform for property search!"</p>
          <h5>- Rajesh Kumar, Delhi</h5>
        </div>
        <div className="testimonial">
          <p>"Easy to list and get leads for my property. Highly recommended."</p>
          <h5>- Priya Sharma, Bangalore</h5>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>Have queries? Reach out to us anytime!</p>
        <p>Email: support@99acres.com</p>
        <p>Phone: +91 98765 43210</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 99Acres Real Estate Portal | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default Home;
