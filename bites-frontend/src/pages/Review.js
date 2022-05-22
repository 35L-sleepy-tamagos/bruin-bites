import React, { useEffect } from "react";
import { getReviews, createReview } from "../components/firebaseConfig/utils";
import { useFormik } from "formik";
import "../css/Review.css"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import ReviewCard from "../components/ReviewCard";
// import "./Review.css"

// FOR CSS spacing: https://getbootstrap.com/docs/4.0/utilities/spacing/
// The above docs apply to css not react bootstrap but everything works if you 
// put the format string into the className attribute within JSX
//
// Also note Review.css is commented out at the moment to not interfere with
// default bootstrap styling
//
// TODO: get colors to play nice with dark mode (try overriding bootstrap
// defaults in a base css file instead of going file by file?)

export default function Review() {
	const [reviews, setReviews] = React.useState([]);
	useEffect(() => {
		console.log("getting reviews");
		getReviews().then((reviews) => {
			setReviews(reviews);
		});
	}, []);
	// Note that we have to initialize ALL of fields with values. These
	// could come from props, but since we don’t want to prefill this form,
	// we just use an empty string. If we don’t do this, React will yell
	// at us.
	const formik = useFormik({
		initialValues: {
			Subject: "",
			Review: "",
			Rating: 0,
		},
		onSubmit: (values) => {
			values.user = "testuser";
			createReview(values);
			setReviews([...reviews, values]);
			//   alert(JSON.stringify(values, null, 2));
		},
	});
	return (
		<Container>
			<Row>
				<Col>
					<h1 className="fs-1">Review Page for Bruin Bites!</h1>
				</Col>
			</Row>
			<Row>
				<Col className="bg-light col-12">
				<Form onSubmit={formik.handleSubmit} className="py-3">
					<Form.Group>
						<Form.Label htmlFor="title">Subject</Form.Label>
						<Form.Control
							placeholder="Enter a title..."
							id="title"
							name="title"
							type="text"
							onChange={formik.handleChange}
							value={formik.values.title}
							className="title-field"
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label htmlFor="body">Review</Form.Label>
						<Form.Control
							placeholder="Enter your review..."
							id="body"
							name="body"
							type="text"
							onChange={formik.handleChange}
							value={formik.values.body}
							className="body-field"
						/>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label htmlFor="rating">Overall Rating (0-5)</Form.Label>
						<Form.Control
							placeholder="Enter your rating..."
							id="rating"
							name="rating"
							type="text"
							onChange={formik.handleChange}
							value={formik.values.rating}
							className="rating-field"
						/>
					</Form.Group>

					<Button variant="primary" type="submit">Submit</Button>
				</Form>
				</Col>
			</Row>

			<Row>
				<Col className="mt-5">
					<h1 className="fs-1">Recent Reviews!</h1>
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
	);
}
