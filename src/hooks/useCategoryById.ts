import { useEffect } from "react"
import { useLazyGetCategoriesQuery } from "../api/categoryApi"
import { Category } from "../types"

export default function useCategoryById(id: number): Category | null {

    const [getCategories, { data }] = useLazyGetCategoriesQuery()

    useEffect(() => {
        getCategories()
    }, [id])

    if (!data) {
        return null
    }

    const result = data.find(item => item.id == id)

    return result ?? null
}