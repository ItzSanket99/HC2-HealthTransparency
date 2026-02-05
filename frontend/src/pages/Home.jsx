import { useEffect, useState } from "react"
import heroImg from "../assets/hero-illustration.png"
import searchCareImg from "../assets/search-care.png"
import compareImg from "../assets/compare-options.png"
import estimateImg from "../assets/estimate-cost.png"

import overviewImg from "../assets/price-transparency-overview.png"
import indiaCostImg from "../assets/india-healthcare-costs.png"
import solutionImg from "../assets/treatwise-solution.png"
import quoteIcon from "../assets/quote-icon.png"

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
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="home">
      {/* HERO */}
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

      {/* INFO CARDS */}
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

{/* PRICE TRANSPARENCY SECTION */}
<section className="transparency-section">
  <div className="transparency-container">

    {/* LEFT SIDE */}
    <div className="transparency-left">
      <h2>
        What is healthcare price transparency in India?
      </h2>

      <p>
        In India, treatment costs are often known only after care is completed.
        Healthcare price transparency helps patients understand expected costs
        in advance so they can compare hospitals, plan expenses, and avoid
        unexpected medical bills.
      </p>

      <p>
        TreatWise makes healthcare pricing clear, accessible, and easy to
        compare — helping people make informed healthcare decisions.
      </p>

      <button className="primary-btn">
        Learn More
      </button>
    </div>

    {/* RIGHT SIDE */}
    <div className="transparency-right">

      <div className="transparency-row">
        <img src={overviewImg} alt="At a high level" />
        <div>
          <h4>At a high level</h4>
          <p>
            Knowing treatment and hospital costs upfront reduces confusion
            and financial stress.
          </p>
        </div>
      </div>

      <div className="transparency-row">
        <img src={indiaCostImg} alt="Why it matters in India" />
        <div>
          <h4>Why it matters in India</h4>
          <p>
            With high out-of-pocket expenses, transparent pricing helps
            families choose affordable care confidently.
          </p>
        </div>
      </div>

      <div className="transparency-row">
        <img src={solutionImg} alt="Where TreatWise fits in" />
        <div>
          <h4>Where TreatWise fits in</h4>
          <p>
            TreatWise brings healthcare prices into one place for easy
            comparison and understanding.
          </p>
        </div>
      </div>



    </div>
  </div>
</section>
{/* TESTIMONIAL SECTION */}
<section className="testimonial-section">
  <div className="testimonial-container">

    <img
      src={quoteIcon}
      alt="Quote icon"
      className="quote-icon"
    />

    <p className="testimonial-text">
      I received multiple hospital bills with unclear charges.
      TreatWise helped me understand whether the costs were reasonable
      and gave me confidence before making further healthcare decisions.
    </p>

  </div>
</section>




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
