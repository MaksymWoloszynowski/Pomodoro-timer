import NavBar from "@/components/NavBar";
import Review from "@/components/Review";
import ReviewForm from "@/components/ReviewForm";
import { prisma } from "@/lib/prisma";

export default async function ReviewsPage() {
  let reviews = [];
  try {
    reviews = await prisma.review.findMany();
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }

  return (
    <div>
      <NavBar />
      <h1>Reviews</h1>
      <div className="review-list">
        {reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
        <p>Leave your review</p>
        <ReviewForm />  
      </div>
    </div>
  );
}
