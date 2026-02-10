import "./Features.css"

const Features = () => {
  return (
    <div className="features-page">
      <section className="features-hero">
        <h1>Platform Features</h1>
        <p>
          Everything you need to make confident, transparent,
          and patient-first healthcare decisions.
        </p>
      </section>

      <section className="features-grid">
        <div className="feature-card">
          <h3>Transparent Cost Comparison</h3>
          <p>
            Compare treatment costs across hospitals with no hidden
            charges or confusing pricing structures.
          </p>
        </div>

        <div className="feature-card">
          <h3>Verified Patient Reviews</h3>
          <p>
            Read real experiences from verified patients to understand
            outcomes, care quality, and satisfaction.
          </p>
        </div>

        <div className="feature-card">
          <h3>Hospital Quality Metrics</h3>
          <p>
            View success rates, infrastructure quality, and performance
            indicators before choosing a hospital.
          </p>
        </div>

        <div className="feature-card">
          <h3>Patient-First Decision Support</h3>
          <p>
            Our platform prioritizes patient benefit, not promotions
            or paid rankings.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Features
