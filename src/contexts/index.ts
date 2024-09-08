import { createContext } from "react"
import { Category } from "../types"

export const CategoryContext = createContext<{
    categories: Category[],
    getById: (id: number) => string
}>({
    categories: [],
    getById: () => ""
})