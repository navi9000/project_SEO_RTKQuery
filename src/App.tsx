import Navbar from "./components/navbar"
import Table from "./components/table"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import UTMBanner from "./components/utmBanner"

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<>
            <Navbar />
            <Table />
            <UTMBanner />
          </>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
