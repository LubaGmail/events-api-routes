const DATA_API = 'https://events-2996b-default-rtdb.firebaseio.com/events.json'

const GetData = async () => {
    const res = await fetch(DATA_API)
    const data = await res.json()

    const eventsArr = []
    for (let key in data) {
        const img = '/' + data[key].image
        eventsArr.push({
            eventid: key,
            ...data[key],
            image: img
        })
    }
    return eventsArr
}

export async function getFilteredEvents(year, month) {
    const eventsArr = await GetData()
    const filteredArr = eventsArr.filter(el => {
        const eventDate = new Date(el.date)
        const eventYear = eventDate.getFullYear()
        const eventMonth = (eventDate.getMonth()) + 1
        if (eventMonth === month && eventYear === year) {
            return el
        }
    })
    return filteredArr
}

export async function getFeaturedEvents () {
    const eventsArr = await GetData()
    const featuredEvents = eventsArr.filter(el => el.isFeatured === true)

    return featuredEvents 
}

export async function getEvent(eventid) {
    const eventsArr = await GetData()
    const event = eventsArr.find(el => el.eventid === eventid)

    return event
}

export default GetData