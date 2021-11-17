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
						props.cart.map((x, i) => {
							return (
								<tr key={i}>
									<td>{x.id}</td>
									<td>{x.name}</td>
									<td>{x.quantity}</td>
									<td>
										<button onClick={() => {props.dispatch({type: 'increase', idx: i})}} style={{marginRight: "5px", width: "38px"}}>+</button>
										<button onClick={() => {props.dispatch({type: 'decrease', idx: i})}} style={{width: "38px"}}>-</button>
									</td>
								</tr>
							)
						})
					}
				</tbody>
			</Table>

			{
				props.alertIsOpened
					? (
						<div className={"my-alert2"}>
							<p>지금 구매하면 할인 20%</p>
							<button onClick={() => {props.dispatch({type: 'closeAlert'})}}>닫기</button>
						</div>
					)
					: null
			}
		</div>
	);
};

const getProps = (state) => {
	return {
		cart: state.reducer,
		alertIsOpened: state.reducer2
	}
}

export default connect(getProps)(Cart)
// export default Cart