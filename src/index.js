import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import cartData from './assets/data/cartData';

const basicState = {
	cart: cartData
};

const reducer = (state = basicState, action) => {
	const modState = {...state};

	if(action.type === 'increase') {
		modState.cart[action.idx].quantity++;
	} else if(action.type === 'decrease' && modState.cart[action.idx].quantity > 1) {
		modState.cart[action.idx].quantity--;
	}
	return modState;
};

const store = createStore(reducer);

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter basename="/react-web">
			<Provider store={store}>
				<App/>
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
