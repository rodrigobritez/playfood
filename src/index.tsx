import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch } from 'react-router-dom'
import { Routes } from './routes';
import { OrdersProvider } from './contexts/ordersContext';

ReactDOM.render(
  <BrowserRouter>
        <Switch>
          <OrdersProvider>
            <Routes/>
          </OrdersProvider>
        </Switch>
    </ BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
