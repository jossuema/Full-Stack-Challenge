import { Category } from "./Category";

// Tipos.ts
export type Note = {
    id: string;
    content: string;
    archived: boolean;
    categories: Category[];
};
