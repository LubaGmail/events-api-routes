import styles from './events-list.module.css'
import Router, { useRouter } from 'next/router';
import Image from 'next/image'

import Button from '../ui/button'

const EventsList = (props) => {
    const { event } = props
    const { index } = props
    const trEven = { background: '#f0f8ff' }

    const router = useRouter()
  
    const toEventDetails = (ev) => {
        const exploreLink = `/events/${ev.eventid}`;
        router.push(exploreLink)
    };

    return (

        <>
            <div className="center">
                <table className={styles.tab}>
                    <tbody>

                        <tr  style={trEven}>
                            <td>
                                {event.title} <br /><br />
                                <Image src={event.image} alt={event.title} className={styles.image}
                                    width={400} height={250}
                                />

                                <br />
                                <Button onClick={() => toEventDetails(props.event)}>Explore Event</Button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default EventsList 
