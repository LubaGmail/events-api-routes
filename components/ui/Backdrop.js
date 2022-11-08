import React from 'react';
import styles from './Backdrop.module.css'

const Backdrop = ({hideErrorDetail}) => {
  return <div className={styles.backdrop} 
      onClick={hideErrorDetail}
    />;
};

export default Backdrop;
