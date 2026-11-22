export interface ReviewModel {
    id: number,
    userEmail: string;
    date: string;
    rating: string;
    bookId: string;
    reviewDescription?: string;
}