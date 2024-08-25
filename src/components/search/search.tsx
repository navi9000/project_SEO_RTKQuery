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

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const targetSearchParams = new URLSearchParams(searchParams)
        targetSearchParams.delete("page")
        if (value) {
            targetSearchParams.set("search", value)
        } else {
            targetSearchParams.delete("search")
        }
        router.replace(pathname.concat("?", targetSearchParams.toString()))
    }

    return (<form onSubmit={onSubmit}>
        <input value={value} onChange={onChange} />
        <button type="submit">Найти</button>
    </form>)
}

export default Search