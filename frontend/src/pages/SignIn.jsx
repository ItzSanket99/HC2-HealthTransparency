  import { useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";

  const SignIn = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // where to go back after signin
    const redirectTo = location.state?.from || "/";
    const hospital = location.state?.hospital;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();

      if (!email || !password) {
        alert("Please enter email and password");
        return;
      }

    const registeredUser = JSON.parse(
    localStorage.getItem("registeredUser")
  );

  localStorage.setItem(
    "user",
    JSON.stringify({
      name: registeredUser?.name || email.split("@")[0],
      email,
    })
  );


      // IMPORTANT: go back WITH hospital data
      navigate(redirectTo, {
        replace: true,
        state: { hospital },
      });
    };

    return (
      <div className="auth-wrapper">
        <div className="auth-card">

          <div className="auth-form-section">
            <h1>Welcome back</h1>
            <p className="auth-subtitle">Login to continue</p>

            <form className="auth-form" onSubmit={handleSubmit}>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="auth-btn" type="submit">
                Sign In
              </button>
            </form>

            <p className="auth-footer">
              New here?{" "}
              <button
                type="button"
                onClick={() =>
                  navigate("/signup", {
                    state: {
                      from: redirectTo,
                      hospital,
                    },
                  })
                }
                className="text-teal-700 font-medium underline"
              >
                Register
              </button>
            </p>
          </div>

          <div className="auth-visual">
            <div className="bubble one"></div>
            <div className="bubble two"></div>
            <h2>
              Clear Costs.<br />
              Trusted Care.<br />
              Better Decisions.
            </h2>
          </div>

        </div>
      </div>
    );
  };

  export default SignIn;
