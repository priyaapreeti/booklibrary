import { useEffect, useState } from "react";
import type { BookModel } from "../../../models/BookModel";
import { SpinnerLoading } from "../../../components/SpinnerLoading";
import { bookService } from "../../../services/bookService";
import { Link } from "react-router-dom";


export const Carousel = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [htttpError, setHttpError] = useState<string | null>(null);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data= await bookService.getbooks(0, 3);
        setBooks(data.content);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setHttpError(error instanceof Error ? error.message : "An error has occured ");
        console.error(error);
      }
    };
    fetchBooks();
  }, []);
  if (loading) return <SpinnerLoading/>;
  if (htttpError) return <div>{htttpError}</div>;
  return (
    <div className="container mt-5" style={{ height: 550 }}>
      <div className="homepage-carousel-title">
        <h3>Find your next "I stayed up too late reading" book.</h3>
      </div>
      <div
        id="carouselExampleControls"
        className="carousel carousel-dark slide mt-5  d-none d-lg-block"
        data-bs-interval="false"
      >
        {/* Desktop */}
        <div className="carousel-inner">
          {books.map((book, idx) => (
            <div
              key={idx}
              className={`carousel-item ${idx === 0 ? "active" : ""}`}
            >
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
                  <div className="text-center">
                    <img src={book.img} width="151" height="233" alt="book" />
                    <h6 className="mt-2">{book.title}</h6>
                    <p>{book.author}</p>
                    <a className="btn main-color text-white" href="#">
                      Reserve
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div className="d-lg-none mt-3">
        <div className="row d-flex justify-content-center align-items-center">
          {books.length > 0 && (
            <div className="text-center">
              <img src={books[0].img} width="151" height="233" alt="book" />
              <h6 className="mt-2">Book</h6>
              <p>{books[0].author}</p>
              <a className="btn main-color text-white" href="#">
                Reserve
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="homepage-carousel-title mt-3">
        <Link className="btn btn-outline-secondary btn-lg" to="/search">
          View More
        </Link>
      </div>
    </div>
  );
};
