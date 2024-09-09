import CartTable from "@/components/cartTable/cartTable"
import fetchData from "@/helpers/fetchData"
import { SERVER_BASE_URL } from "@/utils/consts"
import { Item } from "@/utils/types"
import { Metadata, NextPage } from "next"

export const metadata: Metadata = {
    title: 'Корзина - МойПроект',
}

const Page: NextPage = async () => {

    const { data } = await fetchData<Item[]>(SERVER_BASE_URL.concat("items?archived=false"))

    return (
        <main>
            <h1>Корзина</h1>
            {data && <CartTable catalogItems={data} />}
        </main>
    )
}

export default Page