import { Card, Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
// add css later

function ReviewCard(props) {
	return (
		<Card>
			<Card.Header className="fs-2 border-0">{props.review_header}</Card.Header>
			<div className="m-3">
				<Card.Title className="d-flex justify-content-between">
					<div>{props.review_rating}</div>
					<div>Timestamp(todo){props.review_time}</div>
				</Card.Title>
				<Card.Text>{props.review_text}</Card.Text>
			</div>
		</Card>
	);
}

export default ReviewCard;
