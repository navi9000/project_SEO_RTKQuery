import Search from "@/components/search/search"
import styles from "./page.module.css"
import Sort from "@/components/sort/sort"
import { Metadata, NextPage } from "next"
import Table from "@/components/table/table"
import fetchData from "@/helpers/fetchData"
import { BASE_URL, SERVER_BASE_URL } from "@/utils/consts"
import { Item } from "@/utils/types"
import JsonLD from "@/components/jsonLd/jsonLd"

const ROOT_URL = process.env.NEXT_PUBLIC_ROOT_URL

export const metadata: Metadata = {
  title: 'Основная страница',
  description: "Это основная страница. Она здесь самая главная. Здесь можно посмотреть список товаров, отсортировать их и найти товар по названию.",
  alternates: {
    canonical: ROOT_URL + 'ru/',
    languages: {
      'en': ROOT_URL + 'en/',
      'ru': ROOT_URL + 'ru/'
    }
  }
}

const Home: NextPage<{ searchParams: { sortBy?: string } }> = async ({ searchParams }) => {

  const sp = new URLSearchParams(searchParams)
  sp.set("archived", "false")
  const { data, isError } = await fetchData<Item[]>(SERVER_BASE_URL.concat("items?", sp.toString()))

  return (
    <main className={styles.main}>
      <div>
        <Search />
        <Sort />
        {data && <Table data={data} />}
      </div>
      <JsonLD type="WebSite" params={{
        name: 'МойПроект',
        url: BASE_URL
      }} />
    </main>
  )
}

export default Home
