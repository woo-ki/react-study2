import {Table} from 'react-bootstrap';
import {connect} from 'react-redux';

const Cart = (props) => {
	return (
		<div>
			<Table striped bordered hover variant="dark">
				<thead>
					<tr>
						<th>#</th>
						<th>상품명</th>
						<th>수량</th>
						<th>변경</th>
					</tr>
				</thead>
				<tbody>
					{
						props.products.map((x, i) => {
							return (
								<tr key={i}>
									<td>{x.id}</td>
									<td>{x.name}</td>
									<td>{x.quantity}</td>
									<td>@mdo</td>
								</tr>
							)
						})
					}
				</tbody>
			</Table>
		</div>
	);
};

const getProps = (state) => {
	return {
		products: state.cart
	}
}

export default connect(getProps)(Cart)
// export default Cart