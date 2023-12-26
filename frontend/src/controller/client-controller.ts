import { Note } from "../types/Note";
import { clientServices } from "../service/client-service";

async function categoriesList(): Promise<string[]> {
    const categories = await clientServices.getCategories();
    
    if (!Array.isArray(categories)) {
        console.log(categories);
        throw new Error("La respuesta no es un arreglo.");
    }
    const categoryNames = categories.map(category => category.name);
    return categoryNames;
}

async function notesList(): Promise<Note[]> {
    const notes = await clientServices.getNotes();
    if (!Array.isArray(notes)) {
        console.log(notes);
        throw new Error("La respuesta no es un arreglo.");
    }
    
    return notes.map(nota => {
        return {
            id: nota.id,
            content: nota.content,
            archived: nota.archived,
            categories: nota.categories.map((categoria: {name:string}) => categoria.name)
        };
    });
}

function updateNote (note: Note): void {
    findIdCategoriesByName(note.categories).then(categories => {
        return clientServices.updateNote(note.id, note.content, note.archived, categories);
    });
}

function findIdCategoriesByName (categories: string[]): Promise<number[]> {
    return clientServices.getCategories().then((categoriesList) => {
        const categoriesId: number[] = [];
        categories.forEach((categoryName) => {
            const category = categoriesList.find((category:{name:string, id:number}) => category.name === categoryName);
            if (category) {
                categoriesId.push(category.id);
            }
        });
        return categoriesId;
    });
}

function deleteNote (id:string): void {
    clientServices.deleteNote (id);
}

function createCategory (name:string): void {
    clientServices.createCategory(name);
}

function createNote (note: Note): void {
    findIdCategoriesByName(note.categories).then(categories => {
        return clientServices.createNote (note.content, note.archived, categories);
    });
}

function archiveNoteToggle(id:string): void {
    clientServices.getNoteById(id).then((note) => {
        clientServices.updateNote (id, note.content, !note.archived, note.categories);
    });
}

export const clientController = {
    categoriesList,
    notesList,
    deleteNote,
    updateNote,
    createCategory,
    createNote,
    archiveNoteToggle
};

