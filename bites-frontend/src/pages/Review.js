import React, { useEffect, useState } from "react";
import Select from "react-select"
import {
  getReviews,
  createReview,
  getUsers,
} from "../components/firebaseConfig/utils";
import { useFormik } from "formik";
import "../css/Review.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ReviewCard from "../components/ReviewCard";
import Dropdown from "../components/Dropdown";
import { app, auth } from "../components/firebaseConfig/firebase";
import { useNavigate } from "react-router-dom";
import { diningOptions } from "../components/VenueData";
import {
  getHallReviews, 
  getRatingReviews,
} from "../components/firebaseConfig/utils.js";
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
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
];

const filterOptions = [
  { value: "recency", label: "Date" },
  { value: "dining", label: "Dining Halls" },
  { value: "rating", label: "Rating" },
];

export default function Review({ user }) {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("");
  const [diningFilter, setDiningFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  const [diningOption, setDiningOption] = useState("");
  const [ratingOption, setRatingOption] = useState("");

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  const [reviews, setReviews] = React.useState([]);

  /* initial getting of reviews */
  useEffect(() => {
	  getReviews().then((reviews) => {
		  setReviews(reviews)
	  })
  }, []);

  useEffect(() => {
    console.log("getting reviews");
    if (filter === "dining") {
		setRatingFilter("");
		if (!diningFilter) {
			return;
		}
		getHallReviews(diningFilter.label).then((reviews) => {
			setReviews(reviews);
		});
    }
    else if (filter === "rating") {
		setDiningFilter("");
		if (!ratingFilter) {
			return;
		}
      getRatingReviews(ratingFilter.label).then((reviews) => {
        setReviews(reviews);
      });
    }
	else {
		setRatingFilter("");
		setDiningFilter("");
		getReviews().then((reviews) => {
			setReviews(reviews)
		})
	}
  }, [filter, diningFilter, ratingFilter]);

  // Note that we have to initialize ALL of fields with values. These
  // could come from props, but since we don’t want to prefill this form,
  // we just use an empty string. If we don’t do this, React will yell
  // at us.

  const resetDropdown = () => {
    setDiningOption("");
	setRatingOption("");
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      title: "",
      body: "",
      rating: "",
      diningHall: "",
      time: "",
    },
    onSubmit: (values, actions) => {
		if (!diningOption || !ratingOption) {
			alert("Must enter a Dining Hall and Review!")
			return;
		}
		values.diningHall = diningOption.label;
		values.rating = ratingOption.label;
      // values.user = userName;
      if (!values.name) {
        values.name = user.displayName;
      }
      if (!values.title) {
        alert("Must enter a title!");
        return;
      }
      if (!values.body) {
        alert("Must enter a review!");
        return;
      }
      if (!values.rating) {
        alert("Must enter a rating!");
        return;
      }
      if (!values.diningHall) {
        alert("Must enter a Dining Hall!");
        return;
      }
      values.uid = user.uid;
      createReview(values);
      // setReviews([...reviews, values]);
      //   alert(JSON.stringify(values, null, 2));
      getReviews().then((reviews) => {
        setReviews(reviews);
      });
      actions.resetForm();
      resetDropdown();
    },
  });

  const showAdditionalOptions = (filtertype) => {
    if (!filtertype || filtertype === "recency") {
      return;
    }
    if (filtertype === "dining") {
      return (
        <Select
          options={diningOptions}
          value={diningFilter}
          onChange={(value) => setDiningFilter(value)}
        />
      );
    }
    if (filtertype === "rating") {
      return (
        <Select
          options={ratingOptions}
          value={ratingFilter}
          onChange={(value) => setRatingFilter(value)}
        />
      );
    }
  };

  return (
    user && (
      <Container>
        <Row>
          <Col className="mb-3">
            <h1 className="fs-1">Review Page for Bruin Bites!</h1>
          </Col>
        </Row>
		<Button onClick={() => resetDropdown()}>click me</Button>
        <Row className="bg-light">
          <Col className="col-12 p-5 fs-4">
            <Form onSubmit={formik.handleSubmit} className="px-3">
              <Form.Group>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                  placeholder={user.displayName}
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
                <Select
                  options={diningOptions}
                  value={diningOption}
                  onChange={(value) =>
					setDiningOption(value)
                  }
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
                <Form.Label htmlFor="rating">Rating</Form.Label>
                <Select
                  options={ratingOptions}
                  value={ratingOption}
                  onChange={(value) =>
                    setRatingOption(value)
                  }
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col className="mt-5">
            <h1 className="fs-1">Recent Reviews!</h1>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="filter">Filter</Form.Label>
          <Dropdown
            options={filterOptions}
            value={filter}
            onChange={(value) => setFilter(value.value)}
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          warn={filter === "dining" || filter === "rating"}
        >
          <div>{showAdditionalOptions(filter)}</div>
        </Form.Group>
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
                  // <p>{review.user}</p>
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    )
  );
}
