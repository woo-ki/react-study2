import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import cartData from './assets/data/cartData';

const alertDefault = true;

const reducer2 = (state = alertDefault, action) => {
	let modState = state;
	if(action.type === 'closeAlert') {
		modState = false;
	}

	return modState;
}

const reducer = (state = cartData, action) => {
	const modState = [...state];
	switch(action.type) {
		case 'increase':
			modState[action.idx].quantity++;
			break;
		case 'decrease':
			if(modState[action.idx].quantity > 1) {
				modState[action.idx].quantity--;
			}
			break;
		case 'addCart':
			const data = action.payload;
			const idx = modState.findIndex((x) => {
				return x.id === data.id && x.name === data.name;
			});
			if(idx !== -1) {
				modState[idx].quantity++;
			} else {
				modState.push(action.payload);
			}
			break;
		default :
			break;
	}

	return modState;
};

const store = createStore(combineReducers({reducer, reducer2}));

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
