import React from "react";

import "../styles/footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-box">
        <div className="footer-section">
          <h3>CONNECT WITH US</h3>
          <p>📞 +91 5678434349</p>
          <p>📧 info@deepnetsoft.com</p>
        </div>
        
        <div className="footer-logo-container">
          <img src="/images/company.png" alt="Deep Net Soft Logo" className="footer-logo" />
        </div>

        <div className="footer-section">
          <h3>FIND US</h3>
          <p>First Floor, Geo Infopark, Infopark EXP, Kakkanad</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
