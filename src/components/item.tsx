import { useSearchParams } from "react-router-dom"
import { Item } from "../types"
import { useUpdateItemMutation } from "../api/itemApi"
import { useGetCategoriesQuery } from "../api/categoryApi"

export default function TableItem({ id, name, categoryId }: Item) {
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

  const getById = (id: number) =>
    data?.find((item) => item.id === id)?.name ?? ""

  return (
    <li className="item">
      <div className="item__name">{name}</div>
      <div className="item__category">{getById(categoryId)}</div>
      <button className="item__button" onClick={onClick}>
        {isArchived ? "Восстановить" : "В архив"}
      </button>
    </li>
  )
}
