import {useHistory, useParams} from 'react-router-dom';

const Detail = (props) => {

	const history = useHistory();
	const {id} = useParams();

	return (
		<div className="container">
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
