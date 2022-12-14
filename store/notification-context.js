import { createContext, useState, useEffect } from 'react';

// base context for auto completion
//
const NotificationContext = createContext({
  notification: null, // { title, message, status }
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState();

  // Listen for changes in activeNotification state and re-execute the code inside useEffect
  //
  useEffect(() => {
    if (
        activeNotification &&
        (activeNotification.status === 'success' ||
          activeNotification.status === 'error')
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  function showNotificationHandler(notificationData) {
    setActiveNotification(notificationData);
  }

  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
