import "../css/Review.css";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Select from "react-select"
import { useFormik } from "formik";

import { Timestamp } from "firebase/firestore";

import { auth } from "../components/firebaseConfig/firebase";
import {
  getReviews,
  createReview,
  getUsers,
  getHallReviews, 
  getRatingReviews,
  createDining,
  diningPeriod,
  readableDate,
} from "../components/firebaseConfig/utils";

import Dropdown from "../components/Dropdown";
import ReviewCard from "../components/ReviewCard";
import { diningOptions } from "../components/VenueData";

/*
FOR CSS spacing: https://getbootstrap.com/docs/4.0/utilities/spacing/
The above docs apply to css not react bootstrap but everything works if you
put the format string into the className attribute within JSX


TODO: get colors to play nice with dark mode (try overriding bootstrap
defaults in a base css file instead of going file by file?)
*/

/* dropdown options */
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

function Review({ user }) {

  /* stateful variables */  
  /* dropdown options */
  const [diningOption, setDiningOption] = useState("");
  const [ratingOption, setRatingOption] = useState("");

  /* filters */
  const [filter, setFilter] = useState("");
  const [diningFilter, setDiningFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  /* confirmation messages */
  const [showDiningError, setShowDiningError] = useState(false);
  const [showDiningNotif, setShowDiningNotif] = useState(false);

  /* user related statefuls */
  const [userDetails, setUserDetails] = useState([]);
  const [refetchUser, setRefetchUser] = useState(true);

  /* reviews */
  const [reviews, setReviews] = React.useState([]);

  /* initial getting of reviews */
  useEffect(() => {
	  getReviews().then((reviews) => {
		  setReviews(reviews)
	  })
  }, []);

  /* refetching after filters are applied */
  useEffect(() => {
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

  /* show the confirmation/error messages */
  useEffect(() => {
    if (!showDiningError) {
      return;
    }
    setTimeout(function () {
      setShowDiningError(false)
    }, 5000)
  }, [showDiningError]);

  useEffect(() => {
    if (!showDiningNotif) {
      return;
    }
    setTimeout(function () {
      setShowDiningNotif(false)
    }, 5000)
  }, [showDiningNotif]);

  // get user details bc that's useful lol
  useEffect(() => {
    const getUser = async () => {
      getUsers(auth.currentUser.uid).then((userDetails) => {
        setUserDetails(userDetails);
      });
      await setRefetchUser(false);
    }
    if (!refetchUser) {
      return;
    }
    if (!auth.currentUser) {
      return;
    }
    getUser();
  }, [refetchUser]);

  // Note that we have to initialize ALL of fields with values. These
  // could come from props, but since we don’t want to prefill this form,
  // we just use an empty string. If we don’t do this, React will yell
  // at us.

  /* for whatever reason, resetform() doesn't refresh the dropdowns
    So here's a function that *sorta* does
  */
  const resetDropdown = () => {
    setDiningOption("");
	  setRatingOption("");
  };

  /* initialize the form */
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
      if (!values.name) {
        if (!userDetails.name) {
          values.name = "Anonymous";
        }
        else {
          values.name = userDetails.name;
        }
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

      values.uid = user ? user.uid : 0;
      const prevLastDining = userDetails.lastDining
      createReview(values).then(() => {
        setRefetchUser(true);
      });

      const timeString = readableDate(Timestamp.now().toDate());
      const diningTime = diningPeriod(timeString);
      if (diningTime === prevLastDining) {
        setShowDiningError(true);
      }
      else {
        setShowDiningNotif(true);
        if (user) {
          createDining(values.diningHall, values.uid);
        }
      }

      getReviews().then((reviews) => {
        setReviews(reviews);
      });

      actions.resetForm();
      resetDropdown();
    },
  });

  /* conditional dropdown */
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
      <Container>
        <Row>
          <Col className="mb-3">
            <h1 className="fs-1">Review Page for Bruin Bites!</h1>
          </Col>
        </Row>
        <Row className="bg-light rounded">
          <Col className="col-12 p-5 fs-4">
            <Form onSubmit={formik.handleSubmit} className="px-3">
              <Form.Group className="mb-3">
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                  className="input review-field"
                  placeholder={userDetails.name ? userDetails.name : "Anonymous"}
                  name="name"
                  id="name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="diningHall">Dining Hall</Form.Label>
                <Select
									className="review-field"
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
									className="review-field"
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

              <div className="mt-3 mb-3" style={{color: "#B52121"}}>
                {showDiningError ? <div>You've already posted a review this period. This will not count towards your total.</div> : <></>}
              </div>
              <div className="mt-3 mb-3" style={{color: "#B52121"}}>
                {showDiningNotif ? <div>Your Review has been Recorded!</div> : <></>}
              </div>
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
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    )
}

export default Review;
