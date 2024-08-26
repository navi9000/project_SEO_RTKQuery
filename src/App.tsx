import Navbar from "./components/navbar"
import Table from "./components/table"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import UTMBanner from "./components/utmBanner"
import { useAppSelector } from "./app/store"

function App() {

  const { theme } = useAppSelector(store => store.infoReducer)

  return (
    <div className={`App${theme === "dark" ? " dark-theme" : ""}`}>
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
