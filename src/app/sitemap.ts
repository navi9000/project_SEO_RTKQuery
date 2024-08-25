import fetchData from '@/helpers/fetchData'
import { SERVER_BASE_URL, BASE_URL } from '@/utils/consts'
import { Item } from '@/utils/types'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const locales = ['en', 'ru']
    const pages = ['', '/cart', '/login']
    const products = await fetchData<Item[]>(SERVER_BASE_URL.concat("items?archived=false"))
    const productPages: string[] = []

    if (products.data) {
        productPages.push(...products.data.map(p => `/products/${p.urlSnippet}-${p.id}`))
    }

    const result: MetadataRoute.Sitemap = []

    locales.forEach(locale => {
        [...pages, ...productPages].forEach(page => {
            result.push({
                url: BASE_URL.concat(locale, page),
                lastModified: new Date(),
                alternates: {
                    languages: {
                        en: BASE_URL.concat("en", page),
                        ru: BASE_URL.concat("ru", page)
                    }
                }
            })
        })
    })

    return result
}