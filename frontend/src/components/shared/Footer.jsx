import { Link } from "react-router-dom"
import "./Footer.css"
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2 className="footer-logo">
            Treat<span>Wise</span>
          </h2>
          <p>
            Transparent healthcare pricing to help you make
            confident and informed decisions.
          </p>
        </div>

        <div className="footer-links">
          <h4>Explore</h4>
          <Link to="/care">Search Care</Link>
          <Link to="/solutions">Solutions</Link>
          <Link to="/resources">Resources</Link>
        </div>

        <div className="footer-links">
          <h4>Account</h4>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Get Started</Link>
        </div>

        <div className="footer-links">
          <h4>Legal</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 TreatWise. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
