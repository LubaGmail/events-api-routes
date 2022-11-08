import React from 'react';

import styles from './Modal.module.css'

const Modal = ({ hideErrorDetail, errorInfo }) => {
    console.log('errorInfo', errorInfo)
  return (
      <div className={styles.modal}>
        <div>
            <li>{errorInfo.statusCode}</li>
            <li>{errorInfo.appStatus}</li>
            <li>
            errorInfo: {JSON.stringify({errorInfo})}
            </li>
        </div>
        <button className="btn brn--alt" onClick={hideErrorDetail}>
            Cancel
        </button>
    </div>
  );
};

export default Modal;
