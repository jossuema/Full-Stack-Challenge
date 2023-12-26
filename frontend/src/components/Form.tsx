import { FC, FormEvent, useState, useEffect } from 'react';
import { Note } from '../types/Note';
import Alert from './Alert';

type FormularioProps = {
    onAdd: (item: string, categories:string[]) => void;
    noteEdit?: Note;
    onEdit?: (id: string, content: string, categories:string[]) => void;
    categories: string[];
    onAddCategory?: (categories: string[]) => void;
};

const Formulario:FC<FormularioProps> = ({ onAdd, noteEdit, onEdit, categories, onAddCategory}) => {
    const [note, setNote] = useState('');
    const [alert, setAlert] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<string>('');
    const [newCategory, setNewCategory] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    useEffect(() => {
        if (noteEdit) {
            setNote(noteEdit.content);
            setSelectedCategories(noteEdit.categories);
        }else{
            setNote('');
        }
    }, [noteEdit]);

    const handleAddCategory = (event: FormEvent) => {
        event.preventDefault();
        if (!newCategory) {
            setAlertType('error');
            setAlert('This field is required');
            return;
        }
        if (categories.includes(newCategory)) {
            setAlertType('error');
            setAlert('This category already exists');
            return;
        }else{
            onAddCategory?.([...categories, newCategory]);
            setNewCategory('');
            setAlertType('');
            setAlert('Category added')
            return;
        }
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategories(prev => {
            if (prev.includes(category)) {
                return prev.filter(c => c !== category);
            } else {
                return [...prev, category];
            }
        });
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (!note.trim()) {
            setAlert("This field is required");
            setAlertType("error");
            return;
        }
        if(noteEdit){
            onEdit?.(noteEdit.id, note, selectedCategories);
            setAlert("Note edited");
            setAlertType('');
            setNote ('');
            setSelectedCategories([]);
            return;
        }else{
            onAdd(note, selectedCategories);
            setNote ('');
            setAlert(null);
            setSelectedCategories([]);
        }
    };

    return (
        <div className="w-1/3 bg-white border-l flex-1 p-4">
            <form onSubmit={handleSubmit} className="p-4">
                {alert && <Alert msg={alert} type={alertType}/>}
                <input
                    type="text"
                    name="input"
                    className="border-2 border-gray-300 rounded p-2 w-full"
                    placeholder="Enter a note"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                />
                <div className='h-40vh overflow-auto mt-2'>
                    {categories.map((category, index) => (
                        <label key={index} className='flex items-center space-x-2 cursor-pointer'>
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                                className='h-5 w-5'
                            />
                            <span className="text-gray-700">{category}</span>
                        </label>
                    ))}
                </div>
                <button
                    type="submit"
                    className="mt-2 w-full bg-blue-500 text-white p-2 rounded"
                >
                    {noteEdit ? 'Edit' : 'Add'}
                </button>
            </form>
            <div className="flex flex-row items-center p-4 w-full">
                <input
                        type="text"
                        name="input"
                        className="border-2 border-gray-300 rounded p-2"
                        placeholder="Enter a category"
                        value={newCategory}
                        onChange={(event) => setNewCategory(event.target.value)}
                    />
                <button
                    type='submit'
                    className="border-2 p-2 bg-blue-500 text-white rounded"
                    onClick={handleAddCategory}
                >
                    Add category
                </button>
            </div>
        </div>
    );
}

export default Formulario