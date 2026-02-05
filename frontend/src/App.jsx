import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/shared/Navbar"

import Home from "./pages/Home"
import SearchPage from "./pages/SearchPage"
import SearchDetails from "./pages/SearchDetails"
import SearchCare from "./pages/SearchCare"
import Solutions from "./pages/Solutions"
import Resources from "./pages/Resources"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search-details" element ={<SearchDetails/>}/>
        <Route path="/care" element={<SearchCare />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default App
