import { Metadata, NextPage } from "next"
import Link from "next/link"
import styles from "./styles.module.css"

export const metadata: Metadata = {
    title: 'Логин - МойПроект',
}

const Page: NextPage = () => {

    return (
        <main className={styles.main}>
            <div className={styles.form}>
                <input name="login" autoComplete="off" />
                <input type="password" name="password" autoComplete="off" />
                <Link href="/" className={styles.button}>Подтвердить</Link>
            </div>
        </main>
    )
}

export default Page