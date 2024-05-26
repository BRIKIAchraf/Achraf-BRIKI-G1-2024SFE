import React from 'react';
import { createRoot } from 'react-dom/client';
import "nprogress/nprogress.css"; //nprogress
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthProvider } from "./contexts/AuthContext";
import { disableReactDevTools
 } from '@fvilers/disable-react-devtools';
// assets
import 'assets/scss/style.scss';

// third party
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// project import
import App from 'layout/App';
import reducer from './store/reducer';
import * as serviceWorker from 'serviceWorker';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}


const store = configureStore({ reducer });

const domain = process.env.REACT_APP_AUTH0_DOMAIN;       // Your Auth0 domain
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID; // Your Auth0 client ID // The API Identifier that you set up in Auth0

// Function to run after authentication
const onRedirectCallback = (appState) => {
  window.history.replaceState(
    {},
    document.title,
    appState?.returnTo || window.location.pathname
  );
};

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
     <AuthProvider>
      <BrowserRouter basename={process.env.REACT_APP_BASE_NAME}>
        <App />
      </BrowserRouter>
      </AuthProvider>
  </Provider>
);

// Service worker configuration
serviceWorker.unregister();
