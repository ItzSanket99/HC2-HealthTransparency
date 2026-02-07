import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  // get logged-in user (if any)
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="logo">
          Treat<span>Wise</span>
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link to="/care">Search Care</Link>
          <Link to="/solutions">Solutions</Link>
          <Link to="/resources">Resources</Link>
        </div>

        {/* Auth Section */}
        <div className="auth-buttons">
          {user ? (
            <>
              <span className="welcome">
                Hello, {user.name}
              </span>

              <button
                className="logout"
                onClick={() => {
                  localStorage.removeItem("user");
                  navigate("/");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="signin">
                Sign In
              </Link>
              <Link to="/signup" className="join">
                Get Started
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
