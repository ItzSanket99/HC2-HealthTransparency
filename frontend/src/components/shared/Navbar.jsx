import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="w-full bg-[#02363D] text-white">
      <div className="w-full px-5 md:px-8 lg:px-10 xl:px-14 h-[85px] flex items-center">


        {/* LEFT — LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 text-[20px] leading-6 tracking-tight"
          style={{ fontFamily: "HK Grotesk, sans-serif" }}
        >
          <span className="text-[#2FA4A9] text-[28px] leading-none font-bold">+</span>
          <span className="font-semibold">Treat</span>
          <span className="font-normal opacity-90">Wise</span>
        </Link>

        {/* RIGHT SIDE (nav + auth grouped) */}
        <div className="ml-auto flex items-center gap-10">

          {/* NAV LINKS */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] leading-6 font-bold text-white">
            <Link className="hover:opacity-80 transition" to="/care">Search Care</Link>
            <Link className="hover:opacity-80 transition" to="/solutions">Solutions</Link>
            <Link className="hover:opacity-80 transition" to="/platform">Platform</Link>
            <Link className="hover:opacity-80 transition" to="/resources">Resources</Link>
          </nav>

          {/* Divider */}
          <div className="hidden md:block w-px h-6 bg-white/30" />

          {/* AUTH */}
          <div className="flex items-center gap-6 text-[15px] leading-6">

            {user ? (
              <>
                <span className="text-white/90">
                  Hello <span className="font-semibold">{user.name}</span>
                </span>

                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    navigate("/");
                  }}
                  className="px-4 py-2 rounded-full border border-white/30 hover:bg-white/10 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/signup" className="font-semibold hover:opacity-80 transition">
                  Sign Up
                </Link>

                <Link
                  to="/signin"
                  className="px-5 py-2 rounded-full bg-[#CFEAEA] text-[#02363D] font-semibold hover:brightness-95 transition"
                >
                  Platform Sign In
                </Link>
              </>
            )}

          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
