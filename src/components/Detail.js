import {useHistory, useParams} from 'react-router-dom';
import styled from 'styled-components';
import '../assets/css/detail.scss';
import {useEffect, useState} from 'react';

const Box = styled.div`
	padding : 20px;
`;

const Title = styled.h4`
	font-size : 25px;
	color : ${props => props.color}; 
`;

const Detail = (props) => {

	const [alertIsOpened, setAlertIsOpened] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setAlertIsOpened(false);
			clearTimeout(timer);
		}, 2000);

		return () => {
			clearTimeout(timer);
			// console.log('난 이제 없어질게!(unmount)');
		};
	}, []);

	useEffect(() => {
		// 여러개 작성할 수 있음! 다만 위부터 순서대로 실행됨
	});

	const history = useHistory();
	const {id} = useParams();
	const product = props.shoes.find((x) => Number(x.id) === Number(id));

	return (
		<div className="container">
			<Box>
				<Title className={"red"}>상세페이지</Title>
			</Box>
			{
				alertIsOpened
					? (
						<div className={"my_alert2"} id={"my-alert"}>
							<p>재고가 얼마 남지 않았습니다!</p>
						</div>
					)
					: null
			}
			<div className="row">
				<div className="col-md-6">
					<img src={`https://codingapple1.github.io/shop/shoes${product.id + 1}.jpg`} alt={"/"} width="100%"/>
				</div>
				<div className="col-md-6 mt-4">
					<h4 className="pt-5">{product.title}</h4>
					<p>{product.content}</p>
					<p>{product.price}원</p>
					<StockInfo stock={props.stock} id={id} />
					<button className="btn btn-danger" onClick={() => {
						const temp = [...props.stock];
						temp[id] -= 1;
						props.setStock(temp);
					}}>주문하기</button>
					<button className="btn btn-info" onClick={() => {
						history.goBack();
					}}>돌아가기
					</button>
				</div>
			</div>
		</div>
	);
};

function StockInfo(props) {
	return (
		<p>재고 : {props.stock[props.id]}</p>
	)
}

export default Detail;
