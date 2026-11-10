import type { BookModel } from "../models/BookModel";
const baseUrl=import.meta.env.VITE_API_BASE_URL;
interface BookResponse {
  content: BookModel[];
  page: {
    totalElements: number;
    totalPage: number;
  };
}
export const bookService = {
    //all services
    async getbooks(pageNo: number, pageSize: number) :Promise<BookResponse>{
        const response = await fetch(
          `${baseUrl}/books?pageNo=${pageNo}&pageSize=${pageSize}`,
        );
        if (!response.ok) {
          throw new Error("failed to fetch books");
        }
        return await response.json();
    }
}