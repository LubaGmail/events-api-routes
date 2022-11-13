import Head from 'next/head'
import '../styles/globals.css'
import Layout from '../components/layout/layout'
import { NotificationContextProvider } from '../store/notification-context';
import Notification from '../components/ui/Notification';

function MyApp({ Component, pageProps }) {
  // return <Component {...pageProps} />
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Wonderful events</title>
          <meta
            name="viewport" 
            content="initial-scale=1.0, width=device-width" 
          />
          <meta
            description='Crazy events'
            content='Super crazy events'
          />
          <link rel = "icon" href = "/images/icons8-wolf-40.png" type = "image/x-icon" />
          
        </Head>
        <Component {...pageProps} />
        <Notification title='Test' message='This is a test' status='success' />
      </Layout>
    </NotificationContextProvider>
  )
}

export default MyApp
