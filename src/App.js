import './App.css';
import {useState} from "react";
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import data from './assets/data/data';

function App() {
	const [shoes, setShoes] = useState(data);

	return (
		<div className="App">
			<Navbar bg="light" expand="lg">
				<Container>
					<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link href="#home">Home</Nav.Link>
							<Nav.Link href="#link">Link</Nav.Link>
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
								<Product product={x} key={i} />
							)
						})
					}
				</div>
			</div>
		</div>
	);
}

function Product(props) {
	return (
		<div className="col-md-4">
			<img src={`https://codingapple1.github.io/shop/shoes${props.product.id + 1}.jpg`} width={"100%"}/>
			<h4>{props.product.title}</h4>
			<p>{props.product.content} &amp; {props.product.price}</p>
		</div>
	);
}

export default App;
