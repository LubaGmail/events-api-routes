import {useRef} from 'react'
import {useRouter} from 'next/router'

import Button from "../ui/button"
import styles from './search-form.module.css'

const SearchForm = (props) => {
    const yearRef = useRef()
    const monthRef = useRef()
    const router = useRouter()

    const handleSubmit = (ev) => {
        ev.preventDefault()
        const year = yearRef.current.value
        const month = monthRef.current.value

        const link = `/events/${year}/${month}`
        router.push(link)
    }

    return (
        <div>
            <form className={styles.grid} onSubmit={handleSubmit}>
                <div>
                    <select id='year' name='year' ref={yearRef}>
                        <option value='2021'>2021</option>
                        <option vakye='2022'>2022</option>
                    </select>
                </div>
                <div>
                    <select id='month' name='month' ref={monthRef}>
                        <option value='1'>January</option>
                        <option value='2'>February</option>
                        <option value='3'>March</option>
                        <option value='4'>April</option>
                        <option value='5'>May</option>
                        <option value='6'>June</option>
                        <option value='7'>July</option>
                        <option value='8'>August</option>
                        <option value='9'>September</option>
                        <option value='10'>October</option>
                        <option value='11'>November</option>
                        <option value='12'>December</option>
                    </select>
                </div>
                <div>
                     <Button>Search</Button>
                </div>
            </form>
        </div>
    )
}

export default SearchForm