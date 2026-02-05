const SignIn = () => {
  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <div className="auth-form-section">
          <h1>Welcome back</h1>
          <p className="auth-subtitle">Login to continue</p>

          <form className="auth-form">
            <label>Email</label>
            <input type="email" />

            <label>Password</label>
            <input type="password" />

            <button className="auth-btn">Sign In</button>
          </form>

          <p className="auth-footer">
            New here? <a href="/signup">Register</a>
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
  )
}

export default SignIn
