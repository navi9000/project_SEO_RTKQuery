"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import fetchData from "@/helpers/fetchData"
import { SERVER_BASE_URL } from "@/utils/consts"

type Category = {
    id: number
    name: string
}

type GlobalProviderParams = {
    categories: Category[]
}

const GlobalContext = createContext<GlobalProviderParams>({ categories: [] })

export const GlobalProvider = ({ children }: { children: ReactNode }) => {

    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        const { data } = await fetchData<Category[]>(SERVER_BASE_URL.concat("categories"))
        if (data) {
            setCategories(data)
        }
    }



    return (
        <GlobalContext.Provider value={{ categories }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalParams = () => useContext(GlobalContext)

