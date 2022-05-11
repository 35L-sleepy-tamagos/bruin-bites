import { Card, Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
// add css later

function ReviewCard(props) {
	return (
		<Card>
			<Card.Header className="fs-2">{props.review_header}</Card.Header>
			<div className="m-3">
				<Card.Title>{props.review_rating} | {props.review_time}</Card.Title>
				<Card.Text>{props.review_text}</Card.Text>
			</div>
		</Card>
	);
}

export default ReviewCard;
