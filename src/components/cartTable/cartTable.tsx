"use client"

import { FC, useEffect, useState } from "react"
import { useCartItemIds } from "@/helpers/useCartItemIds"
import { Item } from "@/utils/types"
import CartTableItem from "./cartTableItem"
import { useParams, useRouter } from "next/navigation"

type Props = {
    catalogItems: Item[]
}

const CartTable: FC<Props> = ({ catalogItems }) => {

    const { cartItemIds, removeAll } = useCartItemIds()
    const [cartItems, setCartItems] = useState<Item[]>([])
    const { lang } = useParams()
    const router = useRouter()

    useEffect(() => {
        setCartItems(catalogItems.filter(item => cartItemIds.includes(item.id)))
    }, [catalogItems, cartItemIds])

    const onClick = () => {
        removeAll()
        alert("Заказ успешно оформлен")
        router.push(`/${lang}`)
    }

    return (
        <div>
            {
                !!cartItems.length && (
                    <ul>
                        {cartItems.map(item => <CartTableItem key={item.id} item={item} />)}
                    </ul>
                )
            }
            {
                !cartItems.length && <div>Ничего не выбрано</div>
            }
            {
                <div><strong>Итого: </strong><span>{cartItems.reduce((prev, curr) => prev + curr.price, 0)}</span><strong> руб</strong></div>
            }
            {
                !!cartItems.length && <button onClick={onClick}>Оформить заказ</button>
            }
        </div>
    )
}

export default CartTable