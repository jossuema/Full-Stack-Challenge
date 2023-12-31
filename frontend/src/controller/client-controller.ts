import { Note } from "../types/Note";
import { clientServices } from "../service/client-service";
import { Category } from "../types/Category";

async function categoriesList(): Promise<Category[]> {
    const categories = await clientServices.getCategories();
    
    if (!Array.isArray(categories)) {
        console.log(categories);
        throw new Error("La respuesta no es un arreglo.");
    }

    return categories;
}

async function notesList(): Promise<Note[]> {
    const notes = await clientServices.getNotes();

    if (!Array.isArray(notes)) {
        console.log(notes);
        throw new Error("La respuesta no es un arreglo.");
    }
    
    return notes;
}

async function updateNote (note: Note): Promise<Response> {
        return clientServices.updateNote(note.id, note.content, note.archived, note.categories);
}

async function deleteNote (id:string): Promise<Response> {
    return clientServices.deleteNote (id);
}

async function createCategory (name:string): Promise<Response> {
    return clientServices.createCategory(name);
}

async function createNote (note: Note): Promise<Response> {
        return clientServices.createNote (note.content, note.archived, note.categories);
}

async function archiveNoteToggle(id:string): Promise<Response> {
    return clientServices.getNoteById(id).then((note) => {
        return clientServices.updateNote (id, note.content, !note.archived, note.categories);
    });
}

async function deleteCategory(id:string): Promise<Response> {
    return clientServices.deleteCategory(id);
}

export const clientController = {
    categoriesList,
    notesList,
    deleteNote,
    updateNote,
    createCategory,
    createNote,
    archiveNoteToggle,
    deleteCategory
};

