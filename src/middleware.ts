import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

    const ROOT_URL = process.env.NEXT_PUBLIC_ROOT_URL as string

    if (!(request.url.startsWith(ROOT_URL.concat("en")) || request.url.startsWith(ROOT_URL.concat("ru")))) {

        const targetUrl = request.url.replace(ROOT_URL, ROOT_URL.concat('ru/'))
        return NextResponse.redirect(new URL(targetUrl))
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
    ],
}