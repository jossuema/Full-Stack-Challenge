import { FC, FormEvent, useState, useEffect } from 'react';
import { Note } from '../types/Note';
import Alert from './Alert';
import { Category } from '../types/Category';

type FormularioProps = {
    onAdd: (item: string, categories:Category[]) => void;
    noteEdit?: Note;
    onEdit: (note: Note) => void;
    categories: Category[];
    onAddCategory: (categories: string) => void;
    deleteCategory: (id: string) => void;
};

const Formulario:FC<FormularioProps> = ({ onAdd, noteEdit, onEdit, categories, onAddCategory, deleteCategory}) => {
    const [note, setNote] = useState('');
    const [alert, setAlert] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<string>('');
    const [newCategoryName, setNewCategoryName] = useState<string>('');
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

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
        if (!newCategoryName) {
            setAlertType('error');
            setAlert('This field is required');
            return;
        }
        if (categories.find(category => category.name === newCategoryName)) {
            setAlertType('error');
            setAlert('This category already exists');
            return;
        }else{
            onAddCategory?.(newCategoryName);
            setNewCategoryName('');
            setAlertType('');
            setAlert('Category added')
            return;
        }
    };

    const handleCategoryChange = (category: Category) => {
        setSelectedCategories(prev => {
            const isCategorySelected = prev.some(c => c.id === category.id);
            if (isCategorySelected) {
                return prev.filter(c => c.id !== category.id);
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
            onEdit?.({...noteEdit, content: note, categories: selectedCategories});
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
                    {categories.map((category) => (
                        <label key={category.id} className='flex items-center justify-between space-x-2'>
                            <div className='flex items-center space-x-2'>
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.some(c => c.id === category.id)}
                                    onChange={() => handleCategoryChange(category)}
                                    className='h-5 w-5 cursor-pointer'
                                />
                                <span className="text-gray-700">{category.name}</span>
                            </div>
                            <img 
                                src='src/assets/error.svg'
                                className='w-3 h-3 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-75'
                                onClick={() => deleteCategory(category.id)}
                            ></img>
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
                        value={newCategoryName}
                        onChange={(event) => setNewCategoryName(event.target.value)}
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