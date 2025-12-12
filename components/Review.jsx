import React from "react";
import Rating from "@mui/material/Rating";

const Review = ({ review }) => {
  return (
    <div className="review-item">
      <div className="review-header">
        <Rating value={review.stars} readOnly />
      </div>
      {review.content && <p className="review-comment">{review.content}</p>}
      {review.createdAt && (
        <span className="review-date">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      )}
    </div>
  );
};

export default Review;
