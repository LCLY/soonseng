import './index.scss';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
// 3rd party lib
import { BrowserRouter } from 'react-router-dom';

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root') || document.createElement('div'));
