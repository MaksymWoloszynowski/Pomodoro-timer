"use client";

import { addReview } from "@/actions/actions";
import { Rating } from "@mui/material";
import { Formik, Form } from "formik";
import React from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const ReviewSchema = Yup.object().shape({
  rating: Yup.number()
    .min(1, "Please provide a rating")
    .required("Rating is required"),
  review: Yup.string().max(100, "Review is too long").nullable(),
});

const ReviewForm = () => {
  return (
    <Formik
      initialValues={{ rating: 0, review: "" }}
      validationSchema={ReviewSchema}
      onSubmit={async (values, { resetForm }) => {
        await addReview(values.rating, values.review);
        toast.success("Review submitted successfully");
        resetForm();
      }}
    >
      {({ values, handleChange }) => (
        <Form className="review-form">
          <Rating
            name="rating"
            value={values.rating}
            onChange={(_, value) =>
              handleChange({ target: { name: "rating", value } })
            }
          />

          <textarea
            name="review"
            cols="30"
            rows="10"
            placeholder="Write your review here..."
            value={values.review}
            onChange={handleChange}
          ></textarea>
          <button className="review-btn" type="submit">Submit Review</button>
        </Form>
      )}
    </Formik>
  );
};

export default ReviewForm;
