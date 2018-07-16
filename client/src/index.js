import 'materialize-css/dist/css/materialize.min.css';
//Root of the Application
import React from 'react';
import ReactDOM from 'react-dom';
//Working with Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

//Modules
import App from './components/App';
import reducers from './reducers';
//Test temp
import axios from 'axios';
window.axios = axios;

// STEP 1: Create a Store Instance
const store = createStore( reducers, {}, applyMiddleware(reduxThunk));

// STEP 2: Pass Store through Provider tag.
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.querySelector('#root')
);
console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment is', process.env.NODE_ENV);
