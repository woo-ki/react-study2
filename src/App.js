import './App.css';
import {useState} from 'react';
import {Button, Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import data from './assets/data/data';
import {Link, Route, Switch, useHistory} from 'react-router-dom';
import Detail from './components/Detail';

function App() {
	const history = useHistory();
	const [shoes, setShoes] = useState(data);

	return (
		<div className="App">
			<Navbar bg="light" expand="lg">
				<Container>
					<Navbar.Brand onClick={() => {history.push('/')}}>ReactStudy</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link><Link to={"/"}>Home</Link></Nav.Link>
							<Nav.Link><Link to={"/detail"}>Detail</Link></Nav.Link>
							<NavDropdown title="Dropdown" id="basic-nav-dropdown">
								<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
							</NavDropdown>
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
				</Route>
				<Route path={"/detail/:id"} render={() => <Detail shoes={shoes} />} />
			</Switch>

		</div>
	);
}

	function Product(props) {
	return (
		<div className="col-md-4" onClick={() => {props.history.push(`detail/${props.product.id}`)}}>
			<img src={`https://codingapple1.github.io/shop/shoes${props.product.id + 1}.jpg`} width={"100%"}/>
			<h4>{props.product.title}</h4>
			<p>{props.product.content} &amp; {props.product.price}</p>
		</div>
	);
}

export default App;
