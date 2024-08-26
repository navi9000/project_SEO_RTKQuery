"use client"

import { useCartItemIds } from "@/helpers/useCartItemIds"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FC, useState, useEffect } from "react"

type Params = {
    lang: string
}

const HeaderCart: FC<Params> = ({ lang }) => {

    const { cartItemIds } = useCartItemIds()
    const [length, setLength] = useState(0)
    const pathname = usePathname()

    useEffect(() => {
        setLength(cartItemIds.length)
    }, [cartItemIds])

    if (pathname === "/".concat(lang, '/login')) {
        return null
    }

    return <Link href={`/${lang}/cart`}>
        <span>Корзина</span>
        {!!length && <span> ({length})</span>}
    </Link>
}

export default HeaderCart