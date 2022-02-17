import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_KEY } from 'config';
import history from 'config/history';
import store from 'config/store';
import { ThemeProvider } from 'containers/ThemeProvider';
import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import AppRouter from 'routes/AppRouter';
import './assets/scss/styles.scss';
import { Toast } from './Components/Toast/Toast';




const stripePromise = loadStripe(STRIPE_KEY);

function Main() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Elements stripe={stripePromise}>
          <ThemeProvider>
            <AppRouter />
          </ThemeProvider>
        </Elements>
        <Toast />
      </Router>
    </Provider>
  );
}

ReactDOM.render(<Main />, document.getElementById('root'));
