import { Link } from "react-router-dom"
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">

       
        <Link to="/" className="logo">
          Treat<span>Wise</span>
        </Link>

       
        <div className="nav-links">
          <Link to="/care">Search Care</Link>
          <Link to="/solutions">Solutions</Link>
          <Link to="/resources">Resources</Link>
        </div>

      
        <div className="auth-buttons">
          <Link to="/signin" className="signin">Sign In</Link>
          <Link to="/signup" className="join">Get Started</Link>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
