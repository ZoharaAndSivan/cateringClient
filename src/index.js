import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//ייבוא סיפריות
//מאפשר ניתובים
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {combineReducers, createStore} from 'redux';
import cateringReducer from './store/reducers/event';
import userReducer from './store/reducers/user';
import orderReducer from './store/reducers/order';
const xstore=createStore(combineReducers({user:userReducer,catering:cateringReducer, order:orderReducer}));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* לתת אפשרות לנתב בפרויקט */}
    <BrowserRouter>
    
    <Provider store={xstore}>
    <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
