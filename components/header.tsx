import styles from "./header.module.scss"

export default function Header() {
    return (
        <header className={styles.header}>
            <div className='container pt-5 pb-3 d-flex align-items-end justify-content-between'>
                <h1 className='m-0'>Carbon Tracker</h1>
                <span className='badge'>Demo data</span>
            </div>
        </header>
    )
}
