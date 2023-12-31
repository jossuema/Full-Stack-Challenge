import { Category } from "../types/Category";

const getNotes = () => fetch('http://localhost:8080/api/notes').then((response) => response.json());

const getCategories = () => fetch('http://localhost:8080/api/notes/categories').then((response) => response.json());

const deleteNote = (id:string) => {
    const response = fetch(`http://localhost:8080/api/notes/${id}`, {
    method: 'DELETE'
    });
    return response;
};

const updateNote = (id:string, content:string, archived:boolean, categories:Category[]) => {
    const body = {
        "content": content,
        "archived": archived,
        "categories": categories
    };
    console.log(body);
    const response = fetch(`http://localhost:8080/api/notes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
        });
    return response;
};

const createCategory = (name:string) => {
    const response = fetch('http://localhost:8080/api/notes/categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name})
    });
    return response;
};

const createNote = (content:string, archived:boolean, categories:Category[]) => {
    const body = {
        content,
        archived,
        categories,
    };
    console.log(body);
    const response = fetch('http://localhost:8080/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    return response;
};

const getNoteById = (id:string) => fetch(`http://localhost:8080/api/notes/${id}`).then((response) => response.json());

const deleteCategory = (id:string) => {
    const response = fetch(`http://localhost:8080/api/notes/categories/${id}`, {
    method: 'DELETE'
    });
    return response;
}

export const clientServices = {
    getNotes,
    getCategories,
    deleteNote,
    updateNote,
    createCategory,
    createNote,
    getNoteById,
    deleteCategory
};
