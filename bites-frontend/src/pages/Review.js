import React, { useEffect } from "react";
import { getReviews, createReview } from "../components/firebaseConfig/utils";
import { useFormik } from "formik";
import "./Review.css"

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
      title: "",
      body: "",
      rating: 0,
    },
    onSubmit: (values) => {
      values.user = "testuser";
      createReview(values);
      setReviews([...reviews, values]);
      //   alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div>
      <h1>Review Page for Bruin Bites</h1>
      <form onSubmit={formik.handleSubmit} class="input-container">
        <label htmlFor="title" className="title">Title</label>
        <textarea
          placeholder="Enter a title..."
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.title}
          className="title-field"
        />

        <label htmlFor="body" className="title">Body</label>
        <textarea
          placeholder="Enter your review..."
          id="body"
          name="body"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.body}
          className="body-field"
        />

        <label htmlFor="rating" className="title">Rating</label>
        <textarea
          id="rating"
          name="rating"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.rating}
          className="rating-field"
        />

        <button type="submit" className="review-button">Submit</button>
      </form>
      {reviews.map((review, i) => {
        return (
          <div key={i}>
            <h2>{review.title}</h2>
            <p>{review.body}</p>
            <p>{review.rating}</p>
            <p>{review.user}</p>
          </div>
        );
      })}
    </div>
  );
}
