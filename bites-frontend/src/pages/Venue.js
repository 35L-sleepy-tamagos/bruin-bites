import React, { useEffect } from "react";
import { Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { Card, Stack, Button, ListGroup } from 'react-bootstrap';
import { getReviews, createReview } from "../components/firebaseConfig/utils";

import ReviewCard from "../components/ReviewCard";


export default function Review() {
	const [reviews, setReviews] = React.useState([]);
	useEffect(() => {
		console.log("getting reviews");
		getReviews().then((reviews) => {
			setReviews(reviews);
		});
	}, []);

	return(
		<Container className="">
			<Row>
				<Col className="col-12 mb-3">
					<h1 className="fs-1">TODO: get name</h1>
				</Col>
			</Row>
			<Row className="bg-light py-3">
				<Col className="col-12 p-5">
					<Container>
						<Row>
							<Col className="col-4">
								<Stack gap={1} className="">
									<Button variant="secondary">I ate here</Button>
									<Button variant="secondary">Leave Review</Button>
									<Button variant="secondary">Share this!</Button>
								</Stack>
							</Col>
							<Col className="col-8">
								<ListGroup>
									<ListGroup.Item>Average Rating</ListGroup.Item>
									<ListGroup.Item>Busyness</ListGroup.Item>
									<ListGroup.Item>Blurb?</ListGroup.Item>
								</ListGroup>
							</Col>
						</Row>
					</Container>
				</Col>
			</Row>

			<Row>
				<Col className="col-12 mt-3">
					<h1 className="fs-1">TODO: filter reviews</h1>
				</Col>
			</Row>
			<Row className="py-2">
				{reviews.map((review, i) => {
					return (
						<Col className="px-0 col-12 gy-3">
							<ReviewCard
								key={i}
								review_header={review.title}
								review_text={review.body}
								review_rating={review.rating}
								// <p>{review.user}</p>
							/>
						</Col>
					);
				})}
			</Row>
		</Container>
	)
}
