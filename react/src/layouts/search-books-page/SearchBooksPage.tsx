import { useEffect, useState } from "react";
import type { BookModel } from "../../models/BookModel";
import { SearchBook } from "./components/SearchBook";
import { bookService } from "../../services/bookService";
import { SpinnerLoading } from "../../components/SpinnerLoading";
import { Pagination } from "./components/Pagination";

export const SearchBooksPage = () => {
  const books_per_page = 5;
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  console.log(totalPages);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const pageNo = currentPage - 1;
        const data = await bookService.getbooks(pageNo, books_per_page);
        setBooks(data.content);
        setTotalBooks(data.page.totalElements);
        setTotalPages(data.page.totalPages);
        window.scrollTo(0, 0);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setHttpError(error instanceof Error ? error.message : "");
      }
    };
    fetchBooks();
  }, [currentPage]);
  if (isLoading) return <SpinnerLoading />;
  if (httpError) return <div>{httpError}</div>;
  const indexOfFirstBook = (currentPage - 1) * books_per_page + 1;
  const lastItem = Math.min(currentPage * books_per_page, totalBooks);
  return (
    <>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-labelledby="Search"
                />
                <button className="btn btn-outline-success">Search</button>
              </div>
            </div>

            <div className="col-4">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </button>

                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      All
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Front End
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Back End
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Data
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      DevOps
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <h5>Number of results: ({totalBooks})</h5>
          </div>

          <p>
            {indexOfFirstBook} to {lastItem} of {totalBooks} items:
          </p>

          {books.map((book) => (
            <SearchBook book={book} key={book.id} />
          ))}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={setCurrentPage}
            />
          )}
        </div>
      </div>
    </>
  );
};
