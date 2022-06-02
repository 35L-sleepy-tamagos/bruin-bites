import React, { useState, useEffect } from "react"
import { Container, Row, Col, Button } from "react-bootstrap";

import { getHallReviews, createDining } from "../components/firebaseConfig/utils";

import ReviewCard from "../components/ReviewCard";


function VenuePage({ diningData, user }) {

	/* reviews */
	const [reviews, setReviews] = useState([]);

	const [avgRating, setAvgRating] = useState("0");

	const name = diningData.name;
	const menuLink = diningData.link;
	// const img = diningData.image;

	/* initial getting of reviews */
	useEffect(() => {
		getHallReviews(name).then((reviews) => {
			setReviews(reviews);
		});
	}, []);

	/* utility */
	const recordDining = () => {
		if (!user) {
			alert("You must be logged in to use this feature!")
			return;
		}
		createDining(name, user.uid);
		alert(`${name} added to your Dining History!`)
	}

	useEffect(() => {
		if (reviews.length === 0) {
			return;
		}
		let ratings = [];
		for (let i = 0; i < reviews.length; i++) {
			let rating = parseInt(reviews[i].rating);
			ratings.push(rating);
		}
		let sum = 0;
		for (let i = 0; i < ratings.length; i++) {
			sum += ratings[i];
		}
		sum /= ratings.length;
		sum = sum.toString().substring(0,4);
		setAvgRating(sum);
	}, [reviews])

	return (
		// <Container className="d-flex col-md-8 offset-md-2 mt-3">
		<Container>
			<Row>
				<Col className="mb-3">
					<h1 className="fs-1"> { name } Details </h1>
				</Col>
			</Row>
			<Row className="bg-light rounded">
				<Col className="col-12 p-5 pt-2 fs-4">
					<h2 className="d-flex justify-content-center mt-3">
						Average Rating {avgRating} / 5
					</h2>
					<div className="d-grid gap-2">
						<Button 
							variant="secondary" 
							size="lg" 
							className="mt-3"
							onClick={() => recordDining()}
							>
							I ate here!
						</Button>
					</div>
					<div className="embedded_menu">
						<iframe 
							title="menu" 
							src={menuLink}
							width="100%"
							/*changed height of embedded menu*/
							height="500"
							/*changed class names for margin spacing*/
							className="py-2"
						/>
					</div>
				</Col>
			</Row>
			<Row className="mt-5">
				<Col>
					<h1>
						Reviews for { name }
					</h1>
				</Col>
			</Row>
			<Row className="py-2">
				{[...reviews].reverse().map((review, i) => {
					return (
						<Col key={i} className="px-0 col-12 gy-3">
							<ReviewCard
								review_header={review.title}
								review_text={review.body}
								review_rating={review.rating}
								review_sender={review.user}
								review_dining={review.diningHall}
								review_time={review.createdAt}
							/>
						</Col>
					);
				})}
			</Row>
		</Container>
	)    
}

export default VenuePage;
