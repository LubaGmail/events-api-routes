import { useRouter } from "next/router"
import Head from 'next/head'
import { useState, useEffect } from 'react'
import GetData, { getFilteredEvents } from "../../components/util/get-data"
import EventsList from '../../components/events/events-list'
import Button from '../../components/ui/button'
import styles from '../../styles/Home.module.css'

const FilteredEventsPage = (props) => {
    const [events, setEvents] = useState()
    const router = useRouter()
    const date = router.query.date
    const pathName = router.pathname
   
    useEffect(() => {
        let year = null; let month = null;
        const dateArr = router?.query?.date
        if (dateArr && dateArr.length > 0) {
            year = dateArr[0]; month = dateArr[1]
        }
  
        const fetchData = async (year, month) => {
           const data = await getFilteredEvents(year, month)
           setEvents(data)
        }

        if (!isNaN(year) && !isNaN(month)) {
            fetchData(+year, +month).catch(error => console.error(error))
        }
    }, [router.query.date])

    let metaDate = ''
    if (date) {
        metaDate = date[1] + '/' + date[0]
    }
    
    let metaHead = (
        <Head>
            <title>Events for month/year {metaDate}</title>
            <meta
                name='Filtered events'
                description='Filtered events'
            />
        </Head>
    )

    if (!events || events.length === 0) {
        return (
            <>
                <div>
                    <Head>
                        <title>No events found for month/year: {metaDate}</title>
                        <meta
                            name='No events found'
                            description='No events found'
                        />
                    </Head>
                </div>
                <div className="center">
                    <h3>No events found for month/year: {metaDate} </h3>
                </div>
                <div className="center">
                    <Button onClick={() => router.back()}>Go Back</Button>
                </div>
            </>
          )
    } else {
        return (
            <>
                <div>
                    {metaHead}
                </div>

                <div className={ styles.container }>
                    <h2>Filtered Events</h2>
                    {
                        events?.map((el, i) => (
                            <li key={i}>
                                <EventsList event={el} index={i} />
                            </li>
                        ))
                    }
                </div>

                <div className="center">
                    <Button onClick={() => router.back()}>Go Back</Button>
                </div>
            </>
        )
    }
}

export default FilteredEventsPage