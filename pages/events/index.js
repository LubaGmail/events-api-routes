import { useState } from 'react'
import Head from 'next/head'

import GetData from "../../components/util/get-data"
import SearchForm from '../../components/events/search-form'
import EventsList from '../../components/events/events-list'
import styles from '../../styles/Home.module.css'

const EventsPage = (props) => {
    const [events, setEvents] = useState(props.events)

    return (
        <>
            <div>
                <Head>
                    <title>Browse all events</title>
                    <meta
                        name='All events'
                        description='Explore our new upcoming events with us'
                    />
                </Head>
            </div>

            <div className={styles.container}>
                <SearchForm />
                <h2>All Events</h2>
                <div>
                {
                    events.map ((el, i) => (
                        <li key={el.eventid}>
                            <EventsList event={el} index={i} />
                        </li>
                    ))
                }
                </div>
            </div>
        
        </>
    )
}

export async function getStaticProps(context) {
    const events = await GetData()
       
    return {
        props: {
            events: events
        }
    }
    
}

export default EventsPage