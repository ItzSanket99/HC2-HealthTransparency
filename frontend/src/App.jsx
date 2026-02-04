import Navbar from "./components/shared/Navbar"
import "./index.css"
{/* tailwind css is configured */}
{/* use tailwind classes for styling  */}

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"

function App() {
  

  return (
    <>
      {/* create all the route in this file */}
      {/* try to create seprate pages and then work on it we will merge it later */}
      <Router>
        <Navbar />
        <Routes>
            <Route path="/" element = {<Home/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
