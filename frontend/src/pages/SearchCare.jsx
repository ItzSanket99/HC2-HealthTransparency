import "./Pages.css"

const SearchCare = () => {
  return (
    <div className="page">
      <section className="page-hero">
        <h1>Search Care</h1>
        <p>
          Explore treatments, compare providers, and find care options
          tailored to your needs.
        </p>
      </section>

      <section className="page-content grid">
        <div className="page-card">
          <h3>Find treatments</h3>
          <p>Search procedures and services across hospitals.</p>
        </div>

        <div className="page-card">
          <h3>Compare providers</h3>
          <p>Review pricing, quality, and location in one view.</p>
        </div>

        <div className="page-card">
          <h3>Plan with confidence</h3>
          <p>Understand expected costs before booking care.</p>
        </div>
      </section>
    </div>
  )
}

export default SearchCare
