import Link from 'next/link'
import styles from './main-header.module.css'

const MainHeader = (props) => {

    return (
        <div className={styles.nav}>
            <ul>
                <li>
                    <Link href='/'>Home</Link>
                </li>
                <li>
                    <Link href='/events'>Browse Events</Link>
                </li>
                <li>
                    <Link href='/about'>About</Link>
                </li>
            </ul>
        </div>
    )
}

export default MainHeader