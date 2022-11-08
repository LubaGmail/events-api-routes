import React from 'react';

import styles from './Modal.module.css'

const Modal = ({ hideErrorDetail, errorInfo }) => {
  const result = JSON.stringify(errorInfo.resultObj).substring(0, 50) + ' [...]'
  return (
    <div className={styles.modal}>
        <p><b>Error Details</b></p>
        <table>
          <tbody>

            <tr>
              <td>Status Code: </td>
              <td>{errorInfo.statusCode}</td>
            </tr>
            <tr>
              <td>App Status: </td>
              <td>{errorInfo.appStatus}</td>
            </tr>
            <tr>
              <td>Original error: </td>
              <td>
                {result}
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={hideErrorDetail}>
            Hide
        </button>
    </div>
  );
};

export default Modal;
