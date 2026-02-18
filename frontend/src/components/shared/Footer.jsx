import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-[#f7f9f9] border-t border-[#e3e8ea] pt-20 font-[HK_Grotesk] text-[#0f2f33]">

      <div className="max-w-[1200px] mx-auto px-12 grid grid-cols-4 gap-x-24 gap-y-10">

        {/* BRAND */}
        <div className="max-w-[320px]">
          <h2 className="text-[28px] font-bold mb-3 tracking-[-0.2px]">
            Treat<span className="text-[#2aa39a]">Wise</span>
          </h2>

          <p className="text-[15px] leading-7 text-[#4c6b70]">
            Transparent healthcare pricing to help you make
            confident and informed decisions.
          </p>
        </div>

        {/* COLUMN 1 */}
        <div className="flex flex-col gap-3">
          <h4 className="text-[18px] font-semibold mb-2">Explore</h4>
          <Link to="/care" className="text-[#2e5156] hover:text-[#2aa39a] text-[15px]">Search Care</Link>
          <Link to="/solutions" className="text-[#2e5156] hover:text-[#2aa39a] text-[15px]">Solutions</Link>
          <Link to="/resources" className="text-[#2e5156] hover:text-[#2aa39a] text-[15px]">Resources</Link>
        </div>

        {/* COLUMN 2 */}
        <div className="flex flex-col gap-3">
          <h4 className="text-[18px] font-semibold mb-2">Account</h4>
          <Link to="/signin" className="text-[#2e5156] hover:text-[#2aa39a] text-[15px]">Sign In</Link>
          <Link to="/signup" className="text-[#2e5156] hover:text-[#2aa39a] text-[15px]">Get Started</Link>
        </div>

        {/* COLUMN 3 */}
        <div className="flex flex-col gap-3">
          <h4 className="text-[18px] font-semibold mb-2">Legal</h4>
          <a href="#" className="text-[#2e5156] hover:text-[#2aa39a] text-[15px]">Privacy Policy</a>
          <a href="#" className="text-[#2e5156] hover:text-[#2aa39a] text-[15px]">Terms of Service</a>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-[#e3e8ea] mt-16">
        <div className="max-w-[1200px] mx-auto px-12 py-6 text-[14px] text-[#5d7b80]">
          © 2026 TreatWise. All rights reserved.
        </div>
      </div>

    </footer>
  )
}

export default Footer
