import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Navbar from "./components/shared/Navbar"

import Home from "./pages/Home"
import SearchPage from "./pages/SearchPage"
import SearchDetails from "./pages/SearchDetails"
import SearchCare from "./pages/SearchCare"
import Solutions from "./pages/Solutions"
import Resources from "./pages/Resources"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Footer from "./components/shared/Footer"
import Reviews from "./pages/Reviews"
import RunAlt from "./components/alternavtive/RunAlt"
import ComparePage from "./pages/ComparePage";
// ✅ Appointment Features (From GitHub)
import HospitalLogin from "./pages/appointments/HospitalLogin"
import HospitalDashboard from "./pages/appointments/HospitalDashboard"

// ✅ Your AI Feature
import AISummary from "./components/ai/AISummary"

// ✅ Your Page Layout Wrapper
import PageWrapper from "./components/layout/PageWrapper"
import HospitalBookingPage from "./pages/appointments/BookAppointment"
import BookAppointment from "./pages/appointments/BookAppointment"

function AppLayout() {
  const location = useLocation();

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/search" element={<PageWrapper><SearchPage /></PageWrapper>} />
        <Route path="/search-details" element={<PageWrapper><SearchDetails /></PageWrapper>} />
        <Route path="/care" element={<PageWrapper><SearchCare /></PageWrapper>} />
        <Route path="/solutions" element={<PageWrapper><Solutions /></PageWrapper>} />
        <Route path="/resources" element={<PageWrapper><Resources /></PageWrapper>} />
        <Route path="/signin" element={<PageWrapper><SignIn /></PageWrapper>} />
        <Route path="/signup" element={<PageWrapper><SignUp /></PageWrapper>} />
        <Route path="/reviews" element={<PageWrapper><Reviews /></PageWrapper>} />
        <Route path="/alternatives/:condition" element={<PageWrapper><RunAlt /></PageWrapper>} />

        {/* Appointment Routes */}
        <Route path="/book" element={<PageWrapper><BookAppointment /></PageWrapper>} />
        <Route path="/hospital-login" element={<PageWrapper><HospitalLogin /></PageWrapper>} />
        <Route path="/hospital-dashboard" element={<PageWrapper><HospitalDashboard /></PageWrapper>} />

        {/* Compare WITHOUT PageWrapper */}
        <Route path="/compare" element={<ComparePage />} />
      </Routes>

      {/* ✅ Hide Footer only on Compare page */}
      {location.pathname !== "/compare" && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
export default App
