import { useState } from 'react'
import Head from 'next/head'

import { getFeaturedEvents } from '../components/util/get-data'
import EventsList from '../components/events/events-list'
import styles from '../styles/Home.module.css'
import NewsletterForm from '../components/inputs/newsletter-form'

const HomePage = (props) => {
  const [events, setEvents] = useState(props.events)

  return (
    <>
      <div>
        <Head>
          <title>Our upcoming events</title>
          <meta
            name='Upcoming events'
            description='Explore our new upcoming events with us'
          />
        </Head>
      </div>

      <div className={styles.container}>
        <NewsletterForm />
        <p>Featured Events</p>
        {
          events.map ((el, i) => (
              <li key={el.eventid}>
                  <EventsList event={el} index={i} />
              </li>
          ))
        }
      </div>
    </>
  )
}

export async function getStaticProps(context) {
  const events = await getFeaturedEvents()
     
  return {
      props: {
          events: events
      }
  }
  
}

export default HomePage
