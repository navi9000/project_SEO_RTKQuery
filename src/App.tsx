import Navbar from "./components/navbar"
import Table from "./components/table"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import UTMBanner from "./components/utmBanner"
import { useAppDispatch, useAppSelector } from "./app/store"
import { useEffect } from "react"
import { fetchUserData } from "./app/infoSlice"

function App() {

  const theme = useAppSelector(store => store.infoReducer.theme)
  const dispatch = useAppDispatch()

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    const data = await dispatch(fetchUserData(1)).unwrap()
    if (data) {
      alert(JSON.stringify(data))
    }
  }

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
