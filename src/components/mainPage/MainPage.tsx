import Navbar from "../navbar"
import Table from "../table"
import UTMBanner from "../utmBanner"

export default function MainPage() {

    console.count("render main")
    return (
        <main>
            <Navbar />
            <Table />
            <UTMBanner />
        </main>
    )
}