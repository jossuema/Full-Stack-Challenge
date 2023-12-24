import './index.css'
import Header from './components/Header'
import Form from './components/Form'
import List from './components/List'
import { useState } from 'react'
import { Note } from './components/Note'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteEdit, setNoteEdit] = useState<Note | undefined>(undefined);

  const addNote = (content: string) => {
    setNotes([...notes, { id: uuidv4(), content, archived: false}]);
    setNoteEdit(undefined);
  };

  const editNote = (id: string) => {
    const note = notes.find(note => note.id === id);
    setNoteEdit(note);
  };

  const saveEditNote = (id: string, content: string) => {
    setNotes(notes.map(item => item.id === id ? { ...item, content } : item));
    setNoteEdit(undefined);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(item => item.id !== id));
  };

  const archiveNote = (id: string) => {
    setNotes(notes.map(item => item.id === id ? { ...item, archived: !item.archived } : item));
  }

  return (
    <div className="flex flex-col h-screen">
      <Header/>
      <div className="flex flex-1">
        <Form onAdd={addNote} noteEdit={noteEdit} onEdit={saveEditNote}/>
        <List notes={notes} onEdit={editNote} onDelete={deleteNote} onArchive={archiveNote}/>
      </div>
    </div>
  )
}

export default App
