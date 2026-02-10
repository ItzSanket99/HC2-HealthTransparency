import "./About.css"

const About = () => {
  return (
    <div className="about-page">

      <section className="about-hero">
        <h1>About TreatWise</h1>
        <p>
          Building transparency, trust, and confidence in healthcare decisions.
        </p>
      </section>

      <section className="about-content">
        <div className="about-card">
          <h2>Our Mission</h2>
          <p>
            TreatWise exists to empower patients with clear, unbiased,
            and transparent information about healthcare treatments.
            We believe no patient should feel confused or uncertain
            when making critical medical decisions.
          </p>
        </div>

        <div className="about-card">
          <h2>The Problem We Address</h2>
          <p>
            Today, patients struggle with hidden treatment costs,
            unclear hospital quality metrics, and unreliable reviews.
            This lack of transparency often leads to stress,
            financial burden, and poor decision-making.
          </p>
        </div>

        <div className="about-card">
          <h2>Our Solution</h2>
          <p>
            TreatWise brings together treatment cost comparisons,
            verified patient experiences, and hospital performance data
            into one simple, patient-first platform.
            Our focus is clarity, fairness, and trust.
          </p>
        </div>

        <div className="about-card">
          <h2>Why TreatWise Matters</h2>
          <p>
            Healthcare decisions impact lives.
            By making information transparent and accessible,
            TreatWise helps patients choose treatments confidently,
            avoid unnecessary expenses, and focus on recovery —
            not confusion.
          </p>
        </div>
      </section>

    </div>
  )
}

export default About
