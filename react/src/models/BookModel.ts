export interface BookModel {
    id: number;
    title: string;
    author?: string;
    description?: string;
    copies?: number;
    copesAvailable?: number;
    category?: string;
    img?: string;
}