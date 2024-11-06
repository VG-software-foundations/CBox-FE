import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="dev-wg2oj6qh8yk3igjl.us.auth0.com"
    clientId="WZ2GMh8D3hPwwH2UWOGcSVPMYPZ1NRjH"
    authorizationParams={{
      redirect_uri: 'http://localhost:3000'
    }}
  >
    <App />
  </Auth0Provider>,
);