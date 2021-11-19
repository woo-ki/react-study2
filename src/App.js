import './App.css';
import React, {lazy, Suspense, useContext, useState} from 'react';
import {Button, Container, Nav, Navbar} from 'react-bootstrap';
import data from './assets/data/data';
import {Link, Route, Switch, useHistory} from 'react-router-dom';
import axios from 'axios';
// import Detail from './components/Detail';
import Cart from './components/Cart';
const Detail = lazy(() => import('./components/Detail'));

const StockContext = React.createContext();

function App() {
	const history = useHistory();
	const [shoes, setShoes] = useState(data);
	const [stock, setStock] = useState([10, 11, 12]);

	return (
		<div className="App">
			<Navbar bg="light" expand="lg">
				<Container>
					<Navbar.Brand onClick={() => {history.push('/')}}>ReactStudy</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link as={Link} to={"/"}>Home</Nav.Link>
							<Nav.Link as={Link} to={"/cart"}>Cart</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<Switch>
				<Route exact={true} path={"/"}>
					<div className="jumbotron background">
						<h1>20% Season Off</h1>
						<p>이거시야 이거시야~</p>
						<p>
							<Button variant={"primary"}>Learn more</Button>
						</p>
					</div>
					<StockContext.Provider value={stock}>
						<div className="container">
							<div className="row">
								{
									shoes.map((x, i) => {
										return (
											<Product product={x} history={history} key={i} />
										)
									})
								}
							</div>
						</div>
					</StockContext.Provider>
					<button className="btn btn-primary" onClick={() => {
						axios.get('https://codingapple1.github.io/shop/data2.json')
							.then((result) => {
								setShoes([...shoes, ...result.data]);
							})
							.catch((error) => {
								console.log(error);
							});
					}}>더보기</button>
				</Route>
				<Route path={"/detail/:id"} render={() => {
					return (
						<Suspense fallback={<div>로딩중입니다.</div>}>
							<Detail shoes={shoes} stock={stock} setStock={setStock}/>
						</Suspense>
					)
				}} />
				<Route path={"/cart"}>
					<Cart/>
				</Route>
			</Switch>

		</div>
	);
}

function Product(props) {
	return (
		<div className="col-md-4" onClick={() => {props.history.push(`detail/${props.product.id}`)}}>
			<img src={`https://codingapple1.github.io/shop/shoes${props.product.id + 1}.jpg`} alt={"/"} width={"100%"}/>
			<h4>{props.product.title}</h4>
			<p>{props.product.content} &amp; {props.product.price}</p>
			<Test idx={props.product.id} />
		</div>
	);
}

function Test(props) {
	const stock = useContext(StockContext);
	return (
		<p>재고 : {stock[props.idx]}</p>
	)
}

export default App;
