import "./HowItWorks.css"

const HowItWorks = () => {
  return (
    <div className="how-page">
      <section className="how-hero">
        <h1>How TreatWise Works</h1>
        <p>
          A simple, transparent process designed to put patients
          in control of their healthcare choices.
        </p>
      </section>

      <section className="steps">
        <div className="step-card">
          <span>1</span>
          <h3>Search Treatment</h3>
          <p>
            Start by selecting the treatment or procedure you need.
          </p>
        </div>

        <div className="step-card">
          <span>2</span>
          <h3>Compare Hospitals</h3>
          <p>
            View cost breakdowns, hospital quality metrics,
            and infrastructure details.
          </p>
        </div>

        <div className="step-card">
          <span>3</span>
          <h3>Read Patient Reviews</h3>
          <p>
            Understand real patient experiences and satisfaction
            before making a choice.
          </p>
        </div>

        <div className="step-card">
          <span>4</span>
          <h3>Choose with Confidence</h3>
          <p>
            Select the hospital that best fits your medical
            and financial needs.
          </p>
        </div>
      </section>
    </div>
  )
}

export default HowItWorks
