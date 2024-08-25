import { FC } from "react"
import { Item } from "@/utils/types"
import AddToCartButton from "../addToCartButton/addToCartButton"
import "./styles.css"

type Props = {
    item: Item
}

const CartTableItem: FC<Props> = ({ item }) => {

    return (
        <li className="table-item">
            <div>{item.name}</div>
            <div className="table-item__price">{item.price} руб</div>
            <AddToCartButton id={item.id} className="table-item__button" />
        </li>
    )
}

export default CartTableItem