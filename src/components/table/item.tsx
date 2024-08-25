"use client"

import { useParams } from "next/navigation"
import "./styles.css"
import Link from "next/link"
import { Item } from "@/utils/types"
import AddToCartButton from "../addToCartButton/addToCartButton"

export default function TableItem({
    id,
    name,
    urlSnippet,
    price,
    categoryId
}: Item) {

    const { lang } = useParams()

    const buildLink = () => {
        return "/".concat(lang as string, `/products/${urlSnippet}-${id}`)
    }

    return (
        <li className="item">
            <div className="item__name"><Link href={buildLink()}>{name}</Link></div>
            <div className="item__category">{/*data?.find(item => item.id === categoryId)?.name*/}</div>
            <div className="item__price">{price}</div>
            <AddToCartButton id={id} className="item__button" />
        </li>
    )
}