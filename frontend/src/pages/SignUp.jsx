import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // where user ultimately wants to go back
  const redirectTo = location.state?.from || "/";
  const hospital = location.state?.hospital;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // basic validation
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    // 📝 fake register success (backend later)
    localStorage.setItem(
      "registeredUser",
      JSON.stringify({ name, email })
    );

    // 🔁 after register → go to SIGN IN
    navigate("/signin", {
      replace: true,
      state: {
        from: redirectTo,
        hospital,
      },
    });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <div className="auth-form-section">
          <h1>Create your account</h1>
          <p className="auth-subtitle">
            Join TreatWise to compare costs, explore trusted care,
            and make confident healthcare decisions.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Create a secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="auth-btn" type="submit">
              Join TreatWise
            </button>
          </form>

        <p className="auth-footer">
  Already have an account?{" "}
  <button
    type="button"
    onClick={() =>
      navigate("/signin", {
        state: {
          from: redirectTo,
          hospital,
        },
      })
    }
    className="text-teal-700 font-medium underline"
  >
    Sign In
  </button>
</p>

        </div>

        <div className="auth-visual">
          <div className="bubble one"></div>
          <div className="bubble two"></div>
          <div className="bubble three"></div>

          <h2>
            Healthcare.<br />
            Made Transparent.
          </h2>
        </div>

      </div>
    </div>
  );
};

export default SignUp;
