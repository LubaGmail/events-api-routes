import {useRef, useState} from 'react'

import classes from './newsletter-form.module.css'

const NewsletterForm = () => {
    const emailRef = useRef()
    const [done, setDone] = useState()

    const registrationHandler = async  (event) => {
        event.preventDefault();
        setDone(false)
        const email = emailRef.current.value

        const obj = {
            id: new Date().toISOString(),
            email: email
        }

        const res = await fetch('/api/newsletter', {
            method: 'POST', 
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json()

        setDone(true)
        emailRef.current.value = ''

    }

    return (
        <section className={classes.newsletter}>
          <h3>Sign up to stay updated!</h3>
          <form onSubmit={registrationHandler}>
            <div className={classes.control}>
              <input ref={emailRef}
                type='email'
                id='email'
                placeholder='Your email'
                aria-label='Your email'
                onChange={() => setDone(false)}
              />
             <button>Register</button>&nbsp;
             {
                done ? <img src='images/icons8-done-16.png' /> : null          
             }      
            </div>
          </form>
        </section>
      );
}

export default NewsletterForm

