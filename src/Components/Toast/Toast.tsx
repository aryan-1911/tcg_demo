import 'normalize.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toast-styles.scss';


export const Toast = () => {

  return (
    <div className="toast-wrapper">
      <ToastContainer autoClose={false} limit={1} position="top-center"  />
    </div>
  );
};
