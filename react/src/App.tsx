import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./layouts/home-page/Homepage";
import { Footer } from "./layouts/navigation-bars/Footer";
import NavigationBar from "./layouts/navigation-bars/NavigationBar";
import { SearchBooksPage } from "./layouts/search-books-page/SearchBooksPage";
import { BookCheckoutPage } from "./layouts/book-checkout-page/BookCheckoutPage";
import { ReviewListPage } from "./layouts/review-list-page/ReviewListPage";
function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavigationBar />
      <main className="flex-grow-1">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<SearchBooksPage />} />
        <Route path="/checkout/:id" element={<BookCheckoutPage/>}/>
        <Route path="/reviewlist/:bookId" element={<ReviewListPage />} />
      </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
