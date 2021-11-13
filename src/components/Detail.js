import {useHistory, useParams} from 'react-router-dom';
import styled from 'styled-components';
import '../assets/css/detail.scss';

const Box = styled.div`
	padding : 20px;
`;

const Title = styled.h4`
	font-size : 25px;
	color : ${props => props.color}; 
`;

const Detail = (props) => {

	const history = useHistory();
	const {id} = useParams();

	return (
		<div className="container">
			<Box>
				<Title className={"red"}>상세페이지</Title>
			</Box>
			<div className={"my_alert"}>
				<p>재고가 얼마 남지 않았습니다!</p>
			</div>
			<div className="row">
				{
					props.shoes.map((x) => {
						if(x.id == id) {
							return (
								<>
									<div className="col-md-6">
										<img src={`https://codingapple1.github.io/shop/shoes${x.id + 1}.jpg`} width="100%"/>
									</div>
									<div className="col-md-6 mt-4">
										<h4 className="pt-5">{x.title}</h4>
										<p>{x.content}</p>
										<p>{x.price}원</p>
										<button className="btn btn-danger">주문하기</button>
										<button className="btn btn-info" onClick={() => {
											history.goBack();
										}}>돌아가기
										</button>
									</div>
								</>
							)
						}
					})
				}
			</div>
		</div>
	);
};

export default Detail;
