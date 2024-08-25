import { useState } from "react"
import CreateModal from "./createModal"
import { useSearchParams, createSearchParams } from "react-router-dom"

export default function Navbar() {

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

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

    return (
        <div className="navbar">
            <nav>
                <button onClick={selectActiveItems}>Активные</button>
                <button onClick={selectArchivedItems}>Архив</button>
            </nav>
            <div>
                <button onClick={handleCreate}>Создать новый элемент</button>
            </div>
            {modalIsOpen && <CreateModal close={() => setModalIsOpen(false)} />}
        </div>
    )
}