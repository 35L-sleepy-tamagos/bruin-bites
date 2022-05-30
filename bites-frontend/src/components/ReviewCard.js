import { Card } from 'react-bootstrap';

function ReviewCard(props) {
	return (
		<Card className="border-0">
			<Card.Header className="fs-2 border-0">{props.review_header}</Card.Header>
			<div className="m-3">
				<Card.Title className="d-flex justify-content-between">
					<div>{props.review_rating} / 5</div>
					<div>{props.review_time}</div>
				</Card.Title>
				<Card.Text>{props.review_text}</Card.Text>
				<footer className="d-flex justify-content-between">--{props.review_sender} at {props.review_dining}
				</footer>
			</div>
		</Card>
	);
}

export default ReviewCard;
