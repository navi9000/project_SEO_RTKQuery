import Link from "next/link"

export default function Logo({ lang }: { lang: string }) {

    return <Link href={`/${lang}`} style={{ marginRight: "auto" }}>МойПроект</Link>
}