import { useState } from "react"
import CreateModal from "./createModal"
import { useSearchParams, createSearchParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/store"
import { setTheme, setLanguage } from "../app/infoSlice"

export default function Navbar() {

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const { lang, theme } = useAppSelector(store => store.infoReducer)
    const dispatch = useAppDispatch()

    const handleCreate = () => {
        setModalIsOpen(true)
    }

    const selectActiveItems = () => {
        const params = createSearchParams(searchParams)
        params.delete("archived")
        setSearchParams(params.toString())
    }

    const selectArchivedItems = () => {
        const params = createSearchParams(searchParams)
        params.set("archived", "true")
        setSearchParams(params.toString())
    }

    const changeTheme = () => {
        dispatch(setTheme(theme === "light" ? "dark" : "light"))
    }

    const changeLanguage = () => {
        dispatch(setLanguage(lang === "en" ? "ru" : "en"))
    }

    return (
        <div className="navbar">
            <nav style={{ display: "flex", gap: "5px" }}>
                <button onClick={selectActiveItems}>Активные</button>
                <button onClick={selectArchivedItems}>Архив</button>
            </nav>
            <div style={{ display: "flex", gap: "5px" }}>
                <button onClick={changeTheme}>{theme === "dark" ? "light" : "dark"}</button>
                <button onClick={changeLanguage}>{lang === "ru" ? "en" : "ru"}</button>
                <button onClick={handleCreate}>Создать новый элемент</button>
            </div>
            {modalIsOpen && <CreateModal close={() => setModalIsOpen(false)} />}
        </div>
    )
}