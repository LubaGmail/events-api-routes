import Head from 'next/head'
import '../styles/globals.css'
import Layout from '../components/layout/layout'

function MyApp({ Component, pageProps }) {
  // return <Component {...pageProps} />
  return (
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
        <link rel = "icon" href = "images/icons8-wolf-40.png" type = "image/x-icon" />
        
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
