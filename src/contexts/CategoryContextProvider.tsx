import { CategoryContext } from "."
import { useGetCategoriesQuery } from "../api/categoryApi"
import { ReactNode } from "react"

export default function CategoryContextProvider({ children }: { children: ReactNode }) {
    const { data } = useGetCategoriesQuery()

    const getById = (id: number) => {
        return data?.find(item => item.id === id)?.name ?? ""
    }

    return <CategoryContext.Provider value={{
        categories: data ?? [],
        getById

    }}>
        {children}
    </CategoryContext.Provider>


}