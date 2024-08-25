import Product from "@/components/product/product"
import fetchData from "@/helpers/fetchData"
import { SERVER_BASE_URL } from "@/utils/consts"
import { Item } from "@/utils/types"
import { Metadata, NextPage } from "next"

type Params = {
    params: {
        lang: string
        name: string
    }
}

export async function generateMetadata({ params: { name } }: Params): Promise<Metadata> {

    const { data } = await fetchData<Item>(SERVER_BASE_URL.concat("item?urlSnippet=", name))

    return {
        title: `${data?.name} — купить по цене ${data?.price} руб в городе Москве — интернет-магазин МойПроект`,
        description: `${data?.name} — купить в интернет-магазине МойПроект с доставкой курьером по Москве. Широкий ассортимент. Выгодные приложения. Скидки по программе лояльности.`
    }
}

const Page: NextPage<Params> = async ({ params: { lang, name } }) => {

    const { data, isError } = await fetchData<Item>(SERVER_BASE_URL.concat("item?urlSnippet=", name))

    return (
        <main>
            {data && <Product {...data} />}
            {isError && <p>Товар не найден</p>}
        </main>
    )
}

export default Page

