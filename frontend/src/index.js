
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss';
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import './index.css';
import { AuthContextProvider } from './pages/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
  </React.StrictMode>
);