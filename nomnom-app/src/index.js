import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Amplify } from 'aws-amplify';
import config from './aws-exports';
import { AmplifyProvider } from '@aws-amplify/ui-react';

Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AmplifyProvider>
    <App />
  </AmplifyProvider>
);

