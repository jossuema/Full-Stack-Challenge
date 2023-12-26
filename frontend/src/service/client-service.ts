const getNotes = () => fetch('http://localhost:8080/api/notes').then((response) => response.json());

const getCategories = () => fetch('http://localhost:8080/api/notes/categories').then((response) => response.json());

const deleteNote = (id:string) => fetch(`http://localhost:8080/api/notes/${id}`, {
    method: 'DELETE'
});

const updateNote = (id:string, content:string, archived:boolean, categories:number[]) => fetch(`http://localhost:8080/api/notes/${id}`, {
    method: 'PUT',
    body: JSON.stringify({content, archived, categories})
});

const createCategory = (name:string) => fetch('http://localhost:8080/api/notes/categories', {
    method: 'POST',
    body: JSON.stringify({name})
});

const createNote = (content:string, archived:boolean, categories:number[]) => {
    const body = {
        content,
        archived,
        categories: categories.map((category:any) => {
            return {id: category};
        })
    };
    console.log(body);
        fetch('http://localhost:8080/api/notes', {
        method: 'POST',
        body: JSON.stringify(body)
    })
};

const getNoteById = (id:string) => fetch(`http://localhost:8080/api/notes/${id}`).then((response) => response.json());

export const clientServices = {
    getNotes,
    getCategories,
    deleteNote,
    updateNote,
    createCategory,
    createNote,
    getNoteById
};
