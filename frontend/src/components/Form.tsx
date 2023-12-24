import { FC, FormEvent, useState, useEffect } from 'react';
import { Note } from './Note';
import Alert from './Alert';

type FormularioProps = {
    onAdd: (item: string) => void;
    noteEdit?: Note;
    onEdit?: (id: string, content: string) => void;
};

const Formulario:FC<FormularioProps> = ({ onAdd, noteEdit, onEdit }) => {
    const [note, setNote] = useState('');
    const [alert, setAlert] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<string>('');

    useEffect(() => {
        if (noteEdit) {
            setNote(noteEdit.content);
        }else{
            setNote('');
        }
    }, [noteEdit]);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (!note.trim()) {
            setAlert("This field is required");
            setAlertType("error");
            return;
        }
        if(noteEdit){
            onEdit?.(noteEdit.id, note);
            setAlert("Note edited");
            setAlertType('');
            setNote ('');
            return;
        }else{
            onAdd(note);
            setNote ('');
        }
        setAlert(null);
    };

    return (
        <div className="w-1/3 bg-white border-l flex-1 overflow-auto p-4">
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
                <button
                    type="submit"
                    className="mt-2 w-full bg-blue-500 text-white p-2 rounded"
                >
                    {noteEdit ? 'Edit' : 'Add'}
                </button>
            </form>
        </div>
        
    );
}

export default Formulario