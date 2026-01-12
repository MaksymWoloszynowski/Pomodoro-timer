"use client";

import { addReview } from "@/actions/actions";
import { Rating } from "@mui/material";
import { Formik, Form } from "formik";
import React from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const ReviewSchema = Yup.object().shape({
  rating: Yup.number()
    .nullable()
    .min(1, "Please provide a rating")
    .required("Rating is required"),
  review: Yup.string().max(100, "Review is too long").nullable(),
});

const ReviewForm = () => {
  return (
    <Formik
      initialValues={{ rating: null, review: "" }}
      validationSchema={ReviewSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await addReview(values.rating, values.review);
          toast.success("Review submitted successfully");
          resetForm();
        } catch {
          toast.error("Something went wrong");
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
      }) => (
        <Form className="review-form">
          <Rating
            name="rating"
            value={values.rating}
            onChange={(_, value) => {
              setFieldValue("rating", value);
            }}
            onBlur={() => setFieldTouched("rating", true)}
          />

          {touched.rating && errors.rating && (
            <p className="error">{errors.rating}</p>
          )}

          <textarea
            name="review"
            value={values.review}
            onChange={(e) => setFieldValue("review", e.target.value)}
            onBlur={() => setFieldTouched("review", true)}
            placeholder="Write your review here..."
          />

          {touched.review && errors.review && (
            <p className="error">{errors.review}</p>
          )}

          <button className="review-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Submit Review"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ReviewForm;
