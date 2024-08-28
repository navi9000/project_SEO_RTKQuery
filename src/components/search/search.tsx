"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, FC, FormEvent, useState } from "react"

const Search: FC<{}> = () => {

    const [value, setValue] = useState("")
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const onSubmit = () => {
        // e.preventDefault()
        const targetSearchParams = new URLSearchParams(searchParams)
        targetSearchParams.delete("page")
        if (value) {
            targetSearchParams.set("search", value)
        } else {
            targetSearchParams.delete("search")
        }
        router.push(pathname.concat("?", targetSearchParams.toString()))
    }

    return (<div >
        <input value={value} onChange={onChange} />
        <button onClick={onSubmit}>Найти</button>
    </div>)
}

export default Search