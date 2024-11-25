import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <div className="footer">
      <div className="heading">
        <h2>Creatreon<sup>™</sup></h2>
      </div>
      <div className="content">
        <div className="services">
          <h4>Services</h4>
          <p><Link to="#">Content creations</Link></p>
          <p><Link to="#">Web development</Link></p>
          <p><Link to="#">Upload</Link></p>
          <p><Link to="#">Free Lancer</Link></p>
        </div>
        <div className="social-media">
          <h4>Social</h4>
          <p><Link to="#"><i className="fab fa-linkedin"></i> Linkedin</Link></p>
          <p><Link to="#"><i className="fab fa-twitter"></i> Twitter</Link></p>
          <p><Link to="#"><i className="fab fa-github"></i> Github</Link></p>
          <p><Link to="#"><i className="fab fa-facebook"></i> Facebook</Link></p>
          <p><Link to="#"><i className="fab fa-instagram"></i> Instagram</Link></p>
        </div>
        <div className="links">
          <h4>Quick links</h4>
          <p><Link to="#">Home</Link></p>
          <p><Link to="#">About</Link></p>
          <p><Link to="#">Blogs</Link></p>
          <p><Link to="#">Contact</Link></p>
        </div>
        <div className="details">
          <h4 className="address">Address</h4>
          <p>Chitkara University, Punjab.</p>
          <h4 className="mobile">Mobile</h4>
          <p><Link to="#">+91-437337</Link></p>
          <h4 className="mail">@chitkara.edu.in</h4>
          <p><Link to="#">creatron60@gmail.com</Link></p>
        </div>
      </div>
      <footer>
        <hr />
        © 2024 FEE Project
      </footer>
    </div>
  );
}

export default Footer;
