"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { FC } from "react"

const Logout: FC<{ lang: string }> = ({ lang }) => {

    const pathname = usePathname()

    if (pathname === "/".concat(lang, '/login')) {
        return null
    }

    return <Link href={"/".concat(lang, "/login")}>Выйти</Link>
}

export default Logout