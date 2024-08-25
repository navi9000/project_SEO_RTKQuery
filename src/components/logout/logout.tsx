"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { FC } from "react"

const Logout: FC<{}> = () => {

    const pathname = usePathname()
    const { lang }: { lang: string } = useParams()

    return <Link href={"/".concat(lang, "/login")}>Выйти</Link>
}

export default Logout