import Navbar from "./components/shared/Navbar"
import "./index.css"
{/* tailwind css is configured */}
{/* use tailwind classes for styling  */}

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SearchPage from "./pages/SearchPage"
import SearchDetails from "./pages/SearchDetails"

function App() {
  

  return (
    <>
      {/* create all the route in this file */}
      {/* try to create seprate pages and then work on it we will merge it later */}
      <Router>
        <Navbar />
        <Routes>
            <Route path="/" element = {<Home/>}/>
            <Route path="/search" element = {<SearchPage/>}/>
            <Route path="/search-details" element ={<SearchDetails/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
