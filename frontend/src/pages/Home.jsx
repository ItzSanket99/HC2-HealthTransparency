import { useEffect, useState } from "react"
import heroImg from "../assets/hero-illustration.png"
import searchCareImg from "../assets/search-care.png"
import compareImg from "../assets/compare-options.png"
import estimateImg from "../assets/estimate-cost.png"

const treatments = [
  "for MRIs",
  "for ultrasounds",
  "for CT scans",
  "for lab tests",
  "for surgeries",
]

const Home = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % treatments.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="home">
      <section className="hero hero-split">
        <div className="hero-text">
          <h1 className="hero-title">
            Know what you’ll pay <br />
            <span className="hero-highlight">{treatments[index]}</span>
          </h1>

          <p className="hero-subtitle">
            TreatWise helps you explore healthcare costs, compare providers,
            and make confident decisions without surprises.
          </p>

          <div className="hero-actions">
            <button className="primary-btn">Search Care</button>
            <button className="secondary-btn">Explore Insights</button>
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImg} alt="Healthcare transparency" />
        </div>
      </section>

      <section className="cards-section">
        <div className="cards-grid">
          <InfoCard
            img={searchCareImg}
            title="Search for care"
            text="Find the treatment you need and discover providers near you."
          />
          <InfoCard
            img={compareImg}
            title="Compare what matters"
            text="Review pricing, quality, and options side by side."
          />
          <InfoCard
            img={estimateImg}
            title="Estimate your cost"
            text="Understand expected costs before choosing a provider."
          />
        </div>
      </section>

      <footer className="footer">
        © 2026 TreatWise. All rights reserved.
      </footer>
    </div>
  )
}

const InfoCard = ({ img, title, text }) => (
  <div className="info-card">
    <img src={img} alt={title} />
    <h3>{title}</h3>
    <p>{text}</p>
  </div>
)

export default Home
