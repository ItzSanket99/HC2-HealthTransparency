import "./Pages.css"

const Solutions = () => {
  return (
    <div className="page">
      <section className="page-hero">
        <h1>Solutions</h1>
        <p>
          Purpose-built tools designed to bring clarity and transparency
          to healthcare decisions.
        </p>
      </section>

      <section className="page-content grid">
        <div className="page-card">
          <h3>For Patients</h3>
          <p>Make informed choices with clear and reliable data.</p>
        </div>

        <div className="page-card">
          <h3>For Providers</h3>
          <p>Present pricing and services transparently.</p>
        </div>

        <div className="page-card">
          <h3>For Organizations</h3>
          <p>Support cost-aware healthcare decisions at scale.</p>
        </div>
      </section>
    </div>
  )
}

export default Solutions
