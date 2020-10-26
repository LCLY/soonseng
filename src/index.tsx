import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'react-image-lightbox/style.css';
// 3rd party lib
import { BrowserRouter } from 'react-router-dom';
/**
 * @ignore
 */
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root') || document.createElement('div'));
