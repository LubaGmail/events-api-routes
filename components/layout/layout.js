import { useContext } from "react"

import MainHeader from "./main-header"
import Notification from "../ui/Notification"
import NotificationContext from "../../store/notification-context" 

const Layout = (props) => {
    const notificationCtx = useContext(NotificationContext);

    /* notification obj
        {
            title: 'Signing up...',
            message: "Registering for newsletter."
            status: "pending"
        }
    */
    const activeNotification = notificationCtx.notification;

    return (
        <>
            <MainHeader />
            <main>
                {props.children}
            </main>
            {activeNotification && (
                <Notification
                    title={activeNotification.title}
                    message={activeNotification.message}
                    status={activeNotification.status}
                />
            )}
        </>
    )
}

export default Layout
