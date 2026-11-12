import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./layouts/home-page/Homepage";
import { Footer } from "./layouts/navigation-bars/Footer";
import NavigationBar from "./layouts/navigation-bars/NavigationBar";
import { SearchBooksPage } from "./layouts/search-books-page/SearchBooksPage";
function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<SearchBooksPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
