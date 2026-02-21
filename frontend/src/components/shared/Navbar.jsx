import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    addScript.async = true;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,mr,ta,te,bn",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    document.body.appendChild(addScript);
  }, []);

  const changeLanguage = (lang) => {
    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
    }
    setOpen(false);
  };

  return (
    <header className="w-full bg-[#02363D] text-white">
      <div className="w-full px-5 md:px-8 lg:px-10 xl:px-14 h-[85px] flex items-center">

        {/* ===== CUSTOM LANGUAGE BUTTON ===== */}
       

        {/* LEFT — LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 text-[20px] tracking-tight"
        >
          <span className="text-[#2FA4A9] text-[28px] font-bold">+</span>
          <span className="font-semibold">Treat</span>
          <span className="opacity-90">Wise</span>
        </Link>

        <div className="ml-auto flex items-center gap-10">
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-bold">
            <Link to="/hospital-login">Hospital Login</Link>
            <Link to="/care">Search Care</Link>
            <Link to="/solutions">Solutions</Link>
            <Link to="/platform">Platform</Link>
            <Link to="/resources">Resources</Link>
          </nav>

          <div className="hidden md:block w-px h-6 bg-white/30" />

          <div className="flex items-center gap-6 text-[15px]">

  {/* Language Button */}
  <div className="relative">
    <button
      onClick={() => setOpen(!open)}
      className="bg-[#2FA4A9] hover:bg-[#1f8b8f] px-4 py-2 rounded-full text-sm font-semibold transition flex items-center gap-2 shadow-md"
    >
      🌐 Language
    </button>

    {open && (
      <div className="absolute right-0 mt-2 w-40 bg-white text-[#02363D] rounded-xl shadow-lg overflow-hidden z-50">
        <button onClick={() => changeLanguage("en")} className="lang-item">English</button>
        <button onClick={() => changeLanguage("hi")} className="lang-item">हिंदी</button>
        <button onClick={() => changeLanguage("mr")} className="lang-item">मराठी</button>
        <button onClick={() => changeLanguage("ta")} className="lang-item">தமிழ்</button>
        <button onClick={() => changeLanguage("te")} className="lang-item">తెలుగు</button>
        <button onClick={() => changeLanguage("bn")} className="lang-item">বাংলা</button>
      </div>
    )}
  </div>
            {user ? (
              <>
                <span>
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
                <Link to="/signup" className="font-semibold hover:opacity-80">
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