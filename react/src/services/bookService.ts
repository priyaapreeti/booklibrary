import type { BookModel } from "../models/BookModel";
import type { ReviewModel } from "../models/ReviewModel";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
interface BookResponse {
  content: BookModel[];
  page: {
    totalElements: number;
    totalPages: number;
  };
}
interface ReviewResponse {
  content: ReviewModel[];
  page: {
    totalElements: number;
    totalPages: number;
  };
}

export const bookService = {
  //all services
  async getbooks(pageNo: number, pageSize: number): Promise<BookResponse> {
    const response = await fetch(
      `${baseUrl}/books?pageNo=${pageNo}&pageSize=${pageSize}`,
    );
    if (!response.ok) {
      throw new Error("failed to fetch books");
    }
    return await response.json();
  },
  async searchBooksByTitle(title: string, pageNo: number, pageSize: number): Promise<BookResponse> {
    const response = await fetch(`${baseUrl}/books/search/title?title=${title}&pageNo=${pageNo}&pageSize=${pageSize}`);
    if (!response.ok) {
      throw new Error("Failed to fetch book titles");
    }
    return await response.json()
  },
  async searchBooksByCategory(category: string, pageNo: number, pageSize: number): Promise<BookResponse> {
    const response = await fetch(`${baseUrl}/books/search/category?category=${category}&pageNo=${pageNo}&pageSize=${pageSize}`);
    if (!response.ok) {
      throw new Error("Failed to fetch books by categories");
    }
    return await response.json();
  },
  async getBookById(id: string): Promise<BookModel> {
    const response = await fetch(`${baseUrl}/books/${id}`);
    if (!response.ok) {
      throw new Error("Failed to Fetch Book by id");
    }
    return response.json()
  },
  async getGetBookReviewsById(bookId: string): Promise<ReviewResponse> {
    const response = await fetch(`${baseUrl}/reviews/book/${bookId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch book reviews');
    }
    return response.json();

  }
}