"use client"

import { useRouter, usePathname } from "next/navigation"
import { BASE_URL } from "@/utils/consts"

type Props = {
    type: 'WebSite' | 'Product',
    // name: string
    params: {
        [key: string]: string | {
            [key: string]: string
        }
    }
}

export default function JsonLD({ type, params }: Props) {

    const pathname = usePathname()
    const jsonLd = {
        "@context": "https://www.schema.org",
        "@type": type,
        ...params
    }

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}