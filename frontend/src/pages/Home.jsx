import { useEffect, useState } from "react";

import searchCareImg from "../assets/search-care.png";
import compareImg from "../assets/compare-options.png";
import estimateImg from "../assets/estimate-cost.png";
import overviewImg from "../assets/price-transparency-overview.png";
import indiaCostImg from "../assets/india-healthcare-costs.png";
import solutionImg from "../assets/treatwise-solution.png";
import quoteIcon from "../assets/quote-icon.png";
import SearchBar from "../components/shared/SearchBar";

const treatments = [
  "for MRIs",
  "for ultrasounds",
  "for CT scans",
  "for lab tests",
  "for surgeries",
];

const Home = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % treatments.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      {/* HERO */}
      <section className="bg-[var(--bg-section)] pt-20 pb-20 bg-white">
        {/* Heading */}
        <div className="max-w-[920px]">
          <h1 className="font-[var(--font-serif)] text-[72px] leading-[1.05] tracking-[-0.02em] text-[var(--teal-900)] font-semibold">
            Know what you’ll pay <br />
            <span className="text-[var(--teal-700)]">{treatments[index]}</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="mt-10">
          <SearchBar />
        </div>

        {/* Suggested searches */}
        {/* <div className="mt-8 flex flex-wrap gap-4">
          {[
            "Colonoscopy",
            "Knee Repair - Arthroscopic",
            "MRI with Contrast",
            "Tonsil and/or Adenoid Removal",
          ].map((item) => (
            <button
              key={item}
              className="px-3 py-2 rounded-full border border-[var(--teal-700)] text-[var(--teal-700)] text-[15px] hover:bg-[var(--teal-100)] transition"
            >
              {item}
            </button>
          ))}
        </div> */}
      </section>
      {/* INFO CARDS */}
      <section className="mt-1 relative">
        {/* Glow Background */}
        <div
          className="absolute inset-x-0 bottom-0 h-[320px] rounded-[6px] pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(23,111,111,0.22), rgba(23,111,111,0.12) 35%, rgba(23,111,111,0.04) 60%, transparent 80%)",
          }}
        />

        {/* Content */}
        <div className="relative grid md:grid-cols-3 gap-10 py-15 px-8">
          <InfoCard
            img={searchCareImg}
            title="Search for care"
            text="Search for care you need, add your insurance plan, and find providers near you."
          />

          <InfoCard
            img={compareImg}
            title="Compare what matters"
            text="Set your location and quality preferences to compare price options."
          />

          <InfoCard
            img={estimateImg}
            title="Estimate your cost"
            text="Add your insurance details to see what you'll pay, then contact the provider to confirm."
          />
        </div>
      </section>

      {/* PRICE TRANSPARENCY SECTION */}
      <section className="transparency-section">
        <div className="transparency-container">
          {/* LEFT SIDE */}
          <div className="transparency-left">
            <h2>What is healthcare price transparency in India?</h2>

            <p>
              In India, treatment costs are often known only after care is
              completed. Healthcare price transparency helps patients understand
              expected costs in advance so they can compare hospitals, plan
              expenses, and avoid unexpected medical bills.
            </p>

            <p>
              TreatWise makes healthcare pricing clear, accessible, and easy to
              compare — helping people make informed healthcare decisions.
            </p>

            <button className="primary-btn">Learn More</button>
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
          <img src={quoteIcon} alt="Quote icon" className="quote-icon" />

          <p className="testimonial-text">
            I received multiple hospital bills with unclear charges. TreatWise
            helped me understand whether the costs were reasonable and gave me
            confidence before making further healthcare decisions.
          </p>
        </div>
      </section>
    </div>
  );
};
const InfoCard = ({ img, title, text }) => (
  <div
    className="
    bg-white
    rounded-2xl
    p-10
    min-h-[220px]
    border border-[rgba(0,0,0,0.08)]
    shadow-[0_8px_24px_rgba(2,54,61,0.3)]
    transition hover:-translate-y-[3px]
  "
  >
    <img src={img} alt={title} className="w-20 mb-6" />

    <h3 className="text-[22px] font-semibold text-[var(--teal-900)] mb-3">
      {title}
    </h3>

    <p className="text-[15px] leading-6 text-[var(--text-body)]">{text}</p>
  </div>
);

export default Home;
