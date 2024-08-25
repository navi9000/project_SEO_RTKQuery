"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FC } from "react"

const Sort: FC<{}> = () => {

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    const setSort = (field: string) => {
        const targetSearchParams = new URLSearchParams(searchParams)
        targetSearchParams.delete("page")
        targetSearchParams.set("sortBy", field)
        router.push(pathname.concat("?", targetSearchParams.toString()))
    }

    const clearSort = () => {
        const targetSearchParams = new URLSearchParams(searchParams)
        targetSearchParams.delete("page")
        targetSearchParams.delete("sortBy")
        router.push(pathname.concat("?", targetSearchParams.toString()))
    }

    return (
        <div>
            <button onClick={() => setSort("name:ASC")}>Сортировать по названию (возр.)</button>
            <button onClick={() => setSort("name:DESC")}>Сортировать по названию (убыв.)</button>
            <button onClick={() => setSort("price:ASC")}>Сортировать по цене (возр.)</button>
            <button onClick={() => setSort("price:DESC")}>Сортировать по цене (убыв.)</button>
            <button onClick={clearSort}>Сбросить сортировку</button>
        </div>
    )
}

export default Sort