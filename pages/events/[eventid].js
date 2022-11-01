import { useRouter } from 'next/router'
import Head from 'next/head'

import GetData, { getFeaturedEvents, getEvent } from '../../components/util/get-data'
import styles from './eventid.module.css'
import Button from '../../components/ui/button'

import Comments from '../../components/inputs/comments'

const EventDetailPage = (props) => {
    const event = props.event
    const router = useRouter()

    if (!event) {
        const eventId = router.query.eventid 
        return <p className={styles.center}>Loading...</p>
    } 
        
    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        
        <>
            <div>
                <Head>
                    <title key="title">{event.title} - {formattedDate}</title>
                    <meta
                        name={event.title}
                        description={event.description}
                    />
                </Head>
            </div>

            <div className="center">
                <div className={styles.form}>
                    <h2>{event.title}</h2>
                    <div>
                        <label htmlFor='eventid'>Event ID: </label>
                        <input id='eventid' name='eventid' value={event.eventid} readOnly />
                    </div>

                    <div>
                        <label htmlFor='title'>Title: </label>
                        <input id='title' name='title' value={event.title} readOnly />
                    </div>
                    <div>
                        <label htmlFor='location'>Where? </label>
                        <input id='location' name='location' value={event.location} readOnly />
                    </div>
                    <div>
                        <label htmlFor='date'>When? </label>
                        <input id='date' name='date' value={formattedDate} readOnly />
                    </div>

                    <div className={styles.desc}>
                        <p>{event.description}</p>
                    </div>
                </div>

                <div>
                    <Button onClick={() => router.back()}>
                        Go Back
                    </Button>
                </div>
            </div>

            <div className='center'>
                <Comments />
            </div>
        </>
    )
}

export async function getStaticPaths() {
    const events = await getFeaturedEvents();
    const paths = events.map(event => ({ params: { eventid: event.eventid } }));

    // return {
    //     paths: [{ params: { eventid: 'e1' } }, { params: { eventid: 'e2' } }],
    //     fallback: true
    // }
    return {
        paths: paths,
        fallback: 'blocking'
    };
}

export async function getStaticProps(context) {
    const eventid = context.params.eventid
    const event = await getEvent(eventid)

    if (!event) {
        return {
          notFound: true,
        }
    }

    // Expected: { props: { key: value } }
    return {
        props: {
            event: event
        },
        
    }
}

export default EventDetailPage