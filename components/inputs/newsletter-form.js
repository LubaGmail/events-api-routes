import {useRef, useState} from 'react'

import classes from './newsletter-form.module.css'

const NewsletterForm = () => {
    const emailRef = useRef()
    const [success, setSuccess] = useState()
    const [error, setError] = useState()
    const [isFormValid, setIsFormValid] = useState(false)
    const successIcon = '/images/icons8-done-16.png'
    const errorIcon = '/images/icons8-exclamation-mark-16.png'

    const registrationHandler = async  (event) => {
        event.preventDefault();
        setSuccess(false)
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

        const result = await res.json()
      if (result.status === 'success') {
          setSuccess(true)
          emailRef.current.value = ''
        } else  {
          setError(true)
        }
        setIsFormValid(false)
    }
  
    const handleChange = () => {
      setIsFormValid(false); setSuccess(false); setError(false)
      if (!emailRef.current.value || emailRef.current.value.length < 6 ||
        !emailRef.current.value.includes('@') 
      ) {
        
      } else {
        setIsFormValid(true)
      }
    }

    return (
        <section className={classes.newsletter}>
          <div className={classes.control}>
            <h3>Sign up to stay updated!</h3>
          </div>
          <form onSubmit={registrationHandler}>
            <div className={classes.control}>
              <input ref={emailRef}
                type='email'
                id='email'
                placeholder='Your email'
                aria-label='Your email'
                onChange={handleChange}
              />

              <button disabled={!isFormValid} >
                Register
              </button>&nbsp;
              { success ? <img src={successIcon} /> : null }      
              { error   ? <img src={errorIcon} />   : null }  
            </div>
          </form>
        </section>
      );
}

export default NewsletterForm

