import {Table} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, memo} from 'react';
// import {connect} from 'react-redux';

const Cart = () => {

	const state = useSelector(state => state);
	const cart = state.reducer;
	const alertIsOpened = state.reducer2;

	const dispatch = useDispatch();

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
						cart.map((x, i) => {
							return (
								<tr key={i}>
									<td>{x.id}</td>
									<td>{x.name}</td>
									<td>{x.quantity}</td>
									<td>
										<button onClick={() => {dispatch({type: 'increase', idx: i})}} style={{marginRight: "5px", width: "38px"}}>+</button>
										<button onClick={() => {dispatch({type: 'decrease', idx: i})}} style={{width: "38px"}}>-</button>
									</td>
								</tr>
							)
						})
					}
				</tbody>
			</Table>

			{
				alertIsOpened
					? (
						<div className={"my-alert2"}>
							<p>지금 구매하면 할인 20%</p>
							<button onClick={() => {dispatch({type: 'closeAlert'})}}>닫기</button>
						</div>
					)
					: null
			}
			<Parent name={"wooki"} age={29} />
		</div>
	);
};

const Parent = (props) => {
	return (
		<div>
			<Child1 name={props.name}/>
			<Child2 age={props.age}/>
		</div>
	)
}

const Child1 = memo((props) => {
	useEffect(() => {console.log('렌더링1')});
	return (
		<div>{props.name}</div>
	)
});

const Child2 = memo((props) => {
	useEffect(() => {console.log('렌더링2')});
	return (
		<div>{props.age}</div>
	)
});

// const getProps = (state) => {
// 	return {
// 		cart: state.reducer,
// 		alertIsOpened: state.reducer2
// 	}
// }
//
// export default connect(getProps)(Cart)
export default Cart