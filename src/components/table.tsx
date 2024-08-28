import { useEffect } from "react"
import { useGetItemsQuery } from "../api/itemApi"
import TableItem from "./item"
import { useSearchParams } from "react-router-dom"

export default function Table() {

    const [searchParams] = useSearchParams()
    const archived = searchParams.has("archived")

    const { data, isLoading } = useGetItemsQuery({
        archived
    })

    return (
        <div className="table">
            <div className="item item_header">
                <div className="item__name">Наименование</div>
                <div className="item__category">Категория</div>
            </div>
            {
                !!data?.length && <ul>
                    {data.map(item => <TableItem key={item.id} {...item} />)}
                </ul>
            }
            {
                data && !data.length && <div>Не найдено</div>
            }
            {
                isLoading && <div>Загрузка</div>
            }
        </div>
    )
}