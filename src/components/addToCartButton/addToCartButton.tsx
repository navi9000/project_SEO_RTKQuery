"use client"

import { useCartItemIds } from "@/helpers/useCartItemIds"

const AddToCartButton = ({ id, className }: { id: number, className?: string }) => {

    const {
        addItem,
        removeItem,
        itemIsSelected
    } = useCartItemIds()

    const onClick = () => {
        itemIsSelected(id) ? removeItem(id) : addItem(id)
    }

    return (
        <button className={className} onClick={onClick}>{itemIsSelected(id) ? "Убрать из корзины" : "В корзину"}</button>
    )
}

export default AddToCartButton