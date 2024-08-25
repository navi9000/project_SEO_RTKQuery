"use client"

import { useCartItemIds } from "@/helpers/useCartItemIds"
import Link from "next/link"
import { FC, useState, useEffect } from "react"

type Params = {
    lang: string
}

const HeaderCart: FC<Params> = ({ lang }) => {

    const { cartItemIds } = useCartItemIds()
    const [length, setLength] = useState(0)

    useEffect(() => {
        console.log({ cartItemIds })
        setLength(cartItemIds.length)
    }, [cartItemIds])

    return <Link href={`/${lang}/cart`}>
        <span>Корзина</span>
        {!!length && <span> ({length})</span>}
    </Link>
}

export default HeaderCart