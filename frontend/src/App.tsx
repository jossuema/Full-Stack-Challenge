import './index.css'
import Header from './components/Header'
import Form from './components/Form'
import List from './components/List'
import { useState, useEffect } from 'react'
import { Note } from './types/Note'
import { clientController } from './controller/client-controller';
import { Category } from './types/Category'

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteEdit, setNoteEdit] = useState<Note | undefined>(undefined);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    loadNotes();
    loadCategories();
  }, []);

  const loadNotes = () => {
    clientController.notesList().then((notes) => {
      setNotes(notes);
    });
  }

  const loadCategories = () => {
    clientController.categoriesList().then((categories) => {
      setCategories(categories);
    });
  }

  const addNote = (content: string, categories:Category[]) => {
    clientController.createNote({ id: "", content, archived: false, categories}).then(() => {
      loadNotes()});
    setNoteEdit(undefined);
  };

  const editNote = (id: string) => {
    const note = notes.find(note => note.id === id);
    setNoteEdit(note);
  };

  const saveEditNote = (note: Note) => {
    clientController.updateNote(note).then(() => {
      loadNotes()});
    setNoteEdit(undefined);
  };

  const deleteNote = (id: string) => {
    clientController.deleteNote(id).then(() => {
      loadNotes()});
  };

  const archiveNote = (id: string) => {
    clientController.archiveNoteToggle(id).then(() => {
      loadNotes()});
  }

  const addCategory = (name: string) => {
    clientController.createCategory(name).then(() => {
      loadCategories()});
  }
  
  
  const deleteCategory = (id: string) => {
    clientController.deleteCategory(id).then(() => {
      loadCategories()});
  }

  return (
    <div className="flex flex-col h-screen">
      <Header/>
      <div className="flex flex-1">
        <Form onAdd={addNote} noteEdit={noteEdit} onEdit={saveEditNote} categories={categories} onAddCategory={addCategory} deleteCategory={deleteCategory}/>
        <List notes={notes} onEdit={editNote} onDelete={deleteNote} onArchive={archiveNote} categories={categories}/>
      </div>
    </div>
  )
}

export default App
