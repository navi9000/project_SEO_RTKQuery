"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { FC } from "react"

const LocaleSelector: FC<{}> = () => {

    const pathname = usePathname()
    const { lang } = useParams()

    const getTargetLang = () => {
        return lang === "ru" ? "en" : "ru"
    }

    const buildLink = () => {
        return pathname.replace(lang as string, getTargetLang())
    }

    return (
        <Link href={buildLink()}>{getTargetLang()}</Link>
    )
}

export default LocaleSelector
