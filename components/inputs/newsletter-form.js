import {useRef, useState} from 'react'

import classes from './newsletter-form.module.css'
import Backdrop from '../ui/Backdrop'
import Modal from '../ui/Modal'

const FILE_API = '/api/newsletter'
const MONGO_API = '/api/mongo/newsletter' 

const NewsletterForm = () => {
    const emailRef = useRef()
    const [success, setSuccess] = useState()
    const [isError, setIsError] = useState()
    const [errorInfo, setErrorInfo] = useState()
    const [isFormValid, setIsFormValid] = useState(false)
    const successIcon = '/images/icons8-done-16.png'
    const errorIcon = '/images/icons8-exclamation-mark-16.png'
    const [isModalVisible, setIsModalVisible] = useState(false);

    const registrationHandler = async  (event) => {
        event.preventDefault();
        setSuccess(false)
        const email = emailRef.current.value

        const obj = {
            email: email
        }

        const res = await fetch(MONGO_API, {
            method: 'POST', 
            body: JSON.stringify(obj),
            headers: {
              'Content-Type': 'application/json'
            }
        })

        const data = await res.json()
        // await console.log('data', res.status,  data)
        
        if (data.status === 'success') {
            setSuccess(true)
            emailRef.current.value = ''
          } else  {
            setIsError(true)
            const obj = {
              statusCode: res.status,
              appStatus: data.status,
              resultObj: data.result,
            }
            setErrorInfo(obj)
       
        }
        setIsFormValid(false)
      
    }
  
    const dismissError = () => {
      setIsError(false)
      setErrorInfo(null)
      setIsModalVisible(false);
    }
    
    const showErrorDetail = () => {
      setIsModalVisible(true);  
    }
  
    const hideErrorDetail = () => {
      setIsModalVisible(false);  
    }
      
        
    const handleChange = () => {
      setIsFormValid(false); setSuccess(false); setIsError(false)
      if (!emailRef.current.value || emailRef.current.value.length < 6 ||
        !emailRef.current.value.includes('@') 
      ) {
        
      } else {
        setIsFormValid(true)
      }
    }

    return (
      <section className={classes.newsletter}>
        {/* errorInfo: {JSON.stringify({errorInfo})} */}
        {
          isError && <div>
            Error occured. <button onClick={showErrorDetail}>See error details</button> <button onClick={dismissError}>x</button>
          </div>
        }
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
              {isError ? <img src={errorIcon} /> : null}  
            
              {isModalVisible && <Backdrop hideErrorDetail={hideErrorDetail} />}
              {isModalVisible && <Modal hideErrorDetail={hideErrorDetail} errorInfo={errorInfo} />}

            </div>
          </form>
        </section>
      );
}

export default NewsletterForm

