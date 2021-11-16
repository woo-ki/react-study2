import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
const store = createStore(() => {
	const cart = [
		{
			id: 0,
			name: '멋진신발',
			quantity: 2
		},
		{
			id: 1,
			name: '슬픈신발',
			quantity: 6
		},
		{
			id: 2,
			name: '기쁜신발',
			quantity: 5
		},
	]
	return {
		cart: cart
	}
});

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
