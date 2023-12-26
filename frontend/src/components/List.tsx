import { FC, useState, useEffect } from 'react';
import { Note } from '../types/Note';
import CategoriesSelector from './CategoriesSelector';

type ListProps = {
    notes: Note[];
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    onArchive: (id: string) => void;
    categories: string[];
};

const ListCards: FC<ListProps> = ({notes, onEdit, onDelete, onArchive, categories}) => {
    const [showArchived, setShowArchived] = useState<boolean>(false);
    const [bgcolor, setBgcolor] = useState<string>("bg-slate-400");
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    useEffect(() => {
        let notesFiltered = notes;
        if (selectedCategory !== '') {
            notesFiltered = notesFiltered.filter(note => note.categories.includes(selectedCategory));
        }
        setFilteredNotes(notesFiltered.filter(note => note.archived === showArchived));
    }, [notes, showArchived, selectedCategory]);

    const onShowActive = () => {
        setShowArchived(false);
        setBgcolor("bg-slate-400");
    }

    const onShowArchived = () => {
        setShowArchived(true);
        setBgcolor("bg-blue-500");
    }

    return (
        <div className='w-2/3 h-90vh overflow-auto'>
            <div className='h-5vh flex flex-row'>
                <button onClick={onShowActive} className="bg-slate-400 text-white p-2 hover:bg-slate-600 transition duration-300 ease-in-out">Show actived notes</button>
                <button onClick={onShowArchived} className="bg-blue-500 text-white p-2 hover:bg-blue-600 transition duration-300 ease-in-out">Show archived notes</button>
                <CategoriesSelector categories={categories} setSelectedCategory={setSelectedCategory}/>
            </div>
            <div className={`flex justify-center ${bgcolor} h-85vh`}>
                <div className="flex overflow-auto p-4 w-full items-center flex-col">
                    {filteredNotes.map((note) => (
                        <div key={note.id} className="bg-white p-4 rounded shadow mb-4 transition duration-300 ease-in-out hover:shadow-lg flex flex-col justify-between break-words w-[300px]">
                            <span className='text-gray-800 mb-2'>{note.content}</span>
                            <div className='flex flex-wrap gap-2 my-2'>
                                {note.categories.map((category, index) => (
                                    <span key={index} className='bg-gray-200 text-gray-700 p-1 rounded'>{category}</span>
                                ))}
                            </div>
                            <div className='flex justify-end mt-4'>
                                <button onClick={() => onEdit(note.id)} className="bg-blue-500 text-white p-2 rounded mr-2 hover:bg-blue-600 transition duration-300 ease-in-out">Edit</button>
                                <button onClick={() => onDelete(note.id)} className="bg-red-500 text-white p-2 rounded mr-2 hover:bg-red-600 transition duration-300 ease-in-out">Delete</button>
                                <button onClick={() => onArchive(note.id)} className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition duration-300 ease-in-out">{note.archived?"Unarchive":"Archive"}</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
    )
};

export default ListCards;