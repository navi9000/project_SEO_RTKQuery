"use client"

import { FC } from "react"
import { Item } from "@/utils/types"
import AddToCartButton from "../addToCartButton/addToCartButton"
import JsonLD from "../jsonLd/jsonLd"

const Product: FC<Item> = ({ name, price, id }) => {

    const description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, ex alias magni voluptates excepturi natus quod quis consectetur pariatur dolor!"

    return (
        <div>
            <h1>{name}</h1>
            <p>Описание товара: {description}</p>
            <p>Цена: <strong>{price}</strong></p>
            <AddToCartButton id={id} />
            <JsonLD type="Product" params={{
                name,
                description,
                offers: {
                    "@type": "Offer",
                    availability: "https://schema.org/InStock",
                    price: price.toFixed(2).toString(),
                    priceCurrency: 'RUB'
                }
            }} />
        </div>
    )
}

export default Product