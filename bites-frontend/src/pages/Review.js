import React, { useEffect } from "react";
import { getReviews, createReview } from "../components/firebaseConfig/utils";
import { useFormik } from "formik";

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
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.title}
        />

        <label htmlFor="body">Body</label>
        <input
          id="body"
          name="body"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.body}
        />

        <label htmlFor="rating">Rating</label>
        <input
          id="rating"
          name="rating"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.rating}
        />

        <button type="submit">Submit</button>
      </form>
      <h1>Review Page for Bruin Bites</h1>
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
