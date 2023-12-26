import './index.css'
import Header from './components/Header'
import Form from './components/Form'
import List from './components/List'
import { useState, useEffect } from 'react'
import { Note } from './types/Note'
import { clientController } from './controller/client-controller';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteEdit, setNoteEdit] = useState<Note | undefined>(undefined);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    clientController.notesList().then((notes) => {
      setNotes(notes);
    });
    clientController.categoriesList().then((categories) => {
      setCategories(categories);
    });
  }, []);

  const addNote = (content: string, categories:string[]) => {
    clientController.createNote({ id: "", content, archived: false, categories});
    setNoteEdit(undefined);
  };

  const editNote = (id: string) => {
    const note = notes.find(note => note.id === id);
    setNoteEdit(note);
  };

  const saveEditNote = (id: string, content: string, categories: string[]) => {
    clientController.updateNote({id, content, archived: false, categories});
    setNoteEdit(undefined);
  };

  const deleteNote = (id: string) => {
    clientController.deleteNote(id);
  };

  const archiveNote = (id: string) => {
    setNotes(notes.map(item => item.id === id ? { ...item, archived: !item.archived } : item));
    clientController.archiveNoteToggle(id);
  }

  return (
    <div className="flex flex-col h-screen">
      <Header/>
      <div className="flex flex-1">
        <Form onAdd={addNote} noteEdit={noteEdit} onEdit={saveEditNote} categories={categories} onAddCategory={setCategories}/>
        <List notes={notes} onEdit={editNote} onDelete={deleteNote} onArchive={archiveNote} categories={categories}/>
      </div>
    </div>
  )
}

export default App
