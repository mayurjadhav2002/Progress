import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ThemeProvider } from './utils/themeContext/theme-provider';

const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.headers.common['Authorization'] = `${Cookies.get('access_token')}`;

root.render(

  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>

    <BrowserRouter>

      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">


        <App />
      </ThemeProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
