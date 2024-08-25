import { Item } from "@/utils/types"
import TableItem from "./item"
import "./styles.css"

type Props = {
    data: Item[]
}

export default function Table({ data }: Props) {

    return (
        <div className="table">
            <div className="item item_header">
                <div className="item__name">Наименование</div>
                <div className="item__category">Категория</div>
                <div className="item__price">Цена</div>
            </div>
            {
                !!data?.length && <ul>
                    {data.map((item) => <TableItem key={item.id} {...item} />)}
                </ul>
            }
            {
                data && !data.length && <div>Не найдено</div>
            }
            {/* {
                isLoading && <div>Загрузка</div>
            } */}
        </div>
    )
}