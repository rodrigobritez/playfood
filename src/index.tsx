import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch } from 'react-router-dom'
import { Routes } from './routes';

ReactDOM.render(
  <BrowserRouter>
        <Switch>
          <Routes/>
        </Switch>
    </ BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
