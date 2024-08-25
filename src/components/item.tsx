import { useSearchParams } from "react-router-dom"
import { useGetCategoriesQuery } from "../api/categoryApi"
import { Item } from "../types"
import { useUpdateItemMutation } from "../api/itemApi"

export default function TableItem({
    id,
    name,
    categoryId
}: Item) {
    const [searchParams] = useSearchParams()
    const { data } = useGetCategoriesQuery()
    const [updateItem] = useUpdateItemMutation()

    const isArchived = searchParams.has("archived")

    const onClick = () => {
        updateItem({
            id,
            archived: !isArchived
        })
    }

    return (
        <li className="item">
            <div className="item__name">{name}</div>
            <div className="item__category">{data?.find(item => item.id === categoryId)?.name}</div>
            <button className="item__button" onClick={onClick}>{isArchived ? "Восстановить" : "В архив"}</button>
        </li>
    )
}