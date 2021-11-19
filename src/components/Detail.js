import {useHistory, useParams} from 'react-router-dom';
import styled from 'styled-components';
import '../assets/css/detail.scss';
import {useEffect, useRef, useState} from 'react';
import {Nav} from 'react-bootstrap';
import {CSSTransition} from 'react-transition-group';
import {connect} from "react-redux";

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
	const [tabIdx, setTabIdx] = useState(0);
	const [animationSwitch, setAnimationSwitch] = useState(false);
	const nodeRef = useRef(null);

	// 최근 본 상품목록 로컬스토리지 관리
	useEffect(() => {
		const arr = localStorage.getItem('recently') === null ? new Array(id) : JSON.parse(localStorage.getItem('recently'));
		if(arr.includes(id)) {
			arr.splice(arr.indexOf(id), 1);
		}
		arr.push(id);
		localStorage.setItem('recently', JSON.stringify(arr));
	}, [id]);


	return (
		<div className="container">
			<Box>
				<Title className={"red"}>상세페이지</Title>
			</Box>
			{
				alertIsOpened
					? (
						<div className={"my-alert2"} id={"my_alert"}>
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
						const data = {
							id: product.id,
							name: product.title,
							quantity: 1
						};
						props.dispatch({type: 'addCart', payload: data});
					}}>카트담기</button>
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

			<Nav className={"mt-5"} variant="tabs" defaultActiveKey="link-0">
				<Nav.Item>
					<Nav.Link eventKey="link-0" onClick={() => {setTabIdx(0); setAnimationSwitch(false);}}>Active1</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="link-1" onClick={() => {setTabIdx(1); setAnimationSwitch(false);}}>Active2</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="link-2" onClick={() => {setTabIdx(2); setAnimationSwitch(false);}}>Active3</Nav.Link>
				</Nav.Item>
			</Nav>

			<CSSTransition nodeRef={nodeRef} in={animationSwitch} classNames={"animation"} timeout={500}>
				<div ref={nodeRef}>
					<TabContent tabIdx={tabIdx} setAnimationSwitch={setAnimationSwitch} />
				</div>
			</CSSTransition>
		</div>
	);
};

const TabContent = (props) => {
	const setAnimationSwitch = props.setAnimationSwitch;
	useEffect(() => {
		setAnimationSwitch(true);
	});
	if(props.tabIdx === 0) {
		return <div>000</div>
	} else if(props.tabIdx === 1) {
		return <div>111</div>
	} else if(props.tabIdx === 2) {
		return <div>222</div>
	}
}

const StockInfo = (props) => {
	return (
		<p>재고 : {props.stock[props.id]}</p>
	)
}

const getProps = (state) => {
	return {
		cart: state.reducer
	}
}

export default connect(getProps)(Detail);
