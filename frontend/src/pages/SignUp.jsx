const SignUp = () => {
  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <div className="auth-form-section">
          <h1>Create your account</h1>
          <p className="auth-subtitle">
            Join TreatWise to compare costs, explore trusted care,
            and make confident healthcare decisions.
          </p>

          <form className="auth-form">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" />

            <label>Email</label>
            <input type="email" placeholder="you@example.com" />

            <label>Password</label>
            <input type="password" placeholder="Create a secure password" />

            <button className="auth-btn">Join TreatWise</button>
          </form>

          <p className="auth-footer">
            Already have an account? <a href="/signin">Sign In</a>
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
  )
}

export default SignUp
