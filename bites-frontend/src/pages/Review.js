import React, { useEffect, useState } from "react";
import { getReviews, createReview, getUsers } from "../components/firebaseConfig/utils";
import { useFormik } from "formik";
import "../css/Review.css"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import ReviewCard from "../components/ReviewCard";
import Dropdown from "../components/Dropdown";
import { app, auth } from '../components/firebaseConfig/firebase';
import { useNavigate } from 'react-router-dom';
import { diningOptions } from "../components/VenueData"
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

const ratingOptions = [
	{value:"1", label:"1"},
	{value:"2", label:"2"},
	{value:"3", label:"3"},
	{value:"4", label:"4"},
	{value:"5", label:"5"},
]

export default function Review() {
	const navigate = useNavigate();
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

	const [userDetails, setUserDetails] = useState([]);
	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (!user) {
				console.log("no user");
				return;
			}
			console.log("getting userdata");
			getUsers(user.uid).then((userDetails) => {
				setUserDetails(userDetails);
			});		
		})
	}, []);

	const formik = useFormik({
		initialValues: {
			name: "",
			title: "",
			body: "",
			rating: "",
			diningHall: "",
		},
		onSubmit: (values) => {
			// values.user = userName;
			if (!values.name) {
				values.name = userDetails.name ? userDetails.name : "Anonymous";
			}
			if (!values.title) {
				alert("Must enter a title!")
				return;
			}
			if (!values.body) {
				alert("Must enter a review!")
				return;
			}
			if (!values.rating) {
				alert("Must enter a rating!")
				return;
			}
			if (!values.diningHall) {
				alert("Must enter a Dining Hall!")
				return;
			}
			console.log(values);
			createReview(values);
			// setReviews([...reviews, values]);
			console.log(reviews);
			//   alert(JSON.stringify(values, null, 2));
		},
	});

	return (
		<Container>
			<Row>
				<Col className="mb-3">
					<h1 className="fs-1">Review Page for Bruin Bites!</h1>
				</Col>
			</Row>
			<Row className="bg-light">
				<Col className="col-12 p-5 fs-4">
				<Form onSubmit={formik.handleSubmit} className="px-3">
					<Form.Group>
						<Form.Label htmlFor="name">Name</Form.Label>
						<Form.Control
							placeholder={ userDetails.name }
							name="name"
							id="name"
							type="text"
							onChange={formik.handleChange}
							className="input"
							value={formik.values.name}
						/>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label htmlFor="diningHall">Dining Hall</Form.Label>
						<Dropdown
							options={ diningOptions }
							value={formik.values.diningHall}
							onChange={ value => formik.setFieldValue("diningHall", value.label)}
						/>
					</Form.Group>

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
						<Form.Label htmlFor="rating">Overall Rating (1-5)</Form.Label>
						<Dropdown
							options={ ratingOptions }
							value={formik.values.rating}
							onChange={ value => formik.setFieldValue("rating", value.label)}
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
					console.log(reviews);
					return (
						<Col className="px-0 col-12 gy-3">
							<ReviewCard
								key={i}
								review_header={review.title}
								review_text={review.body}
								review_rating={review.rating}
								review_sender={review.user}
								review_dining={review.diningHall}
								// <p>{review.user}</p>
							/>
						</Col>
					);
				})}
			</Row>
		</Container>
	);
}
