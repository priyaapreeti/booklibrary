import { useEffect, useState } from "react";
import { bookService } from "../../services/bookService";
import { SpinnerLoading } from "../../components/SpinnerLoading";
import type { BookModel } from "../../models/BookModel";
import { CheckoutBox } from "./components/CheckoutBox";
import type { ReviewModel } from "../../models/ReviewModel";
import { LatestReviews } from "./components/LatestReviews";


export const BookCheckoutPage = () => {
  const bookId = window.location.pathname.split("/")[2];
  const [reviews, setReviews] = useState<ReviewModel[]>([]);

  const [book, setBook] = useState<BookModel>();
  const [isloading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const [bookData, reviewsData] = await Promise.all([bookService.getBookById(bookId), bookService.getGetBookReviewsById(bookId)]);
        setBook(bookData);
        setReviews(reviewsData.content);
        setIsLoading(false);
      } catch (error) {
        setHttpError(error instanceof Error ? error.message : "");
      }
    };
    fetchBook();
  }, [bookId]);
  if (isloading) return <SpinnerLoading />;
  else if (httpError) return <div>{httpError}</div>;
  return (
    <>
      {/* Desktop View */}
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            <img src={book?.img} width="226" height="349" alt="Book" />
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h2>{book?.title}</h2>
              <h5 className="text-primary">{book?.author}</h5>
              <p className="lead">{book?.description}</p>
            </div>
          </div>
          <CheckoutBox book={book!} />
        </div>
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id}/>
      </div>
      {/* Mobile View */}
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center align-items-center">
          <img src={book?.img} width="226" height="349" alt="Book" />
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2>{book?.title}</h2>
            <h5 className="text-primary">{book?.author}</h5>
            <p className="lead">{book?.description}</p>
          </div>
          <CheckoutBox book={book!} />
        </div>
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id}/>
      </div>
    </>
  );
};
