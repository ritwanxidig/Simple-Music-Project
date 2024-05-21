import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Songs from "./pages/Songs"

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="container p-5 flex w-full h-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/songs" element={<Songs />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App