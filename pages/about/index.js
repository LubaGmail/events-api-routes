import Head from 'next/head'

import styles from './about.module.css'

const About = (props) => {

    return (
        <>
            <div className='center'>
                <h2>About Us</h2>
                <div>
                    
                    {/* <Head>
                        <title>About our company</title>
                        <meta 
                            name='About'
                            description='Some wonderful things about our company'
                        />
                    </Head> */}
                </div>
                <div>
                    <p className={styles.contentBox}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                        industry  &#39;s
                        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
                        make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
                        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
                        of Lorem Ipsum
                        
                    </p>
                </div>
            </div>
        </>
    )
   
}

export default About