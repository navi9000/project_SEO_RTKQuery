import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "./app/store"
import { useEffect, memo } from "react"
import { fetchUserData } from "./app/infoSlice"
import MainPage from "./components/mainPage/MainPage"

function App() {

  const theme = useAppSelector(store => store.infoReducer.theme)
  const dispatch = useAppDispatch()

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    const data = await dispatch(fetchUserData(1)).unwrap()
    // if (data) {
    //   alert(JSON.stringify(data))
    // }
  }

  return (
    <div className={`App${theme === "dark" ? " dark-theme" : ""}`} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
