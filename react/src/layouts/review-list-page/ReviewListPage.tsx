import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { ReviewModel } from "../../models/ReviewModel";
import { bookService } from "../../services/bookService";
import { SpinnerLoading } from "../../components/SpinnerLoading";
import { Review } from "../../components/Review";
import { Pagination } from "../../components/Pagination";

export const ReviewListPage = () => {
  const REVIEW_PER_PAGE = 5;
  const { bookId } = useParams<{ bookId: string }>();
  const [reviews, setReviews] = useState<ReviewModel[]>([]);

  const [isLoading, setLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchdata = async () => {
      if (!bookId) {
        setHttpError("book id is required");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const pageNo = currentPage - 1;
        const reviewData = await bookService.getGetBookReviewsById(
          bookId,
          pageNo,
          REVIEW_PER_PAGE,
        );
        setReviews(reviewData.content);
        setTotalPages(reviewData.page.totalElements);
        setTotalPages(reviewData.page.totalPages);
        setLoading(false);
        window.scrollTo(0, 0);
      } catch (error) {
        setLoading(false);
        setHttpError(
          error instanceof Error ? error.message : "An error has occured",
        );
      }
    };
    fetchdata();
  }, [bookId, currentPage]);
  if (isLoading) return <SpinnerLoading />;
  if (httpError) return <div>{httpError}</div>;

  const indexOfFirstReview = (currentPage - 1) * REVIEW_PER_PAGE + 1;
  const lastItem = Math.min(currentPage * REVIEW_PER_PAGE, totalReviews);

  return (
    <div className="container mt-5">
      {/* Back Button */}
      <div className="row mb-4">
        <div className="col-12">
          <Link to={`/checkout/${bookId}`} className="btn btn-primary">
            Back to Book Details
          </Link>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="row">
        <div className="col-12">
          <h3>All Reviews ({totalReviews})</h3>
          {reviews.length > 0 ? (
            <>
              <p>
                {indexOfFirstReview} of {totalReviews} Reviews
              </p>
              {reviews.map((item) => (
                <Review review={item} key={item.id} />
              ))}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  paginate={setCurrentPage}
                />
              )}
            </>
          ) : (
            <div className="m-3">
              <p className="lead">
                Currently there are no reviews for this book
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
