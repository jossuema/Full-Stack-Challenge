import { FC } from 'react';

type AlertaProps = {
    msg: string;
    type: string;
};

const Alerta: FC<AlertaProps> = ({ msg, type }) => {
    return (
        <div className={`alerta ${type === 'error' ? 'bg-red-300' : 'bg-blue-300'} text-white p-3 rounded my-2`}>
            <img src={type === 'error'? "src/assets/error.svg" : "src/assets/check.svg"} alt={type} className="w-6 h-6 mr-2 inline-block" />
            {msg}
        </div>
    );
};

export default Alerta;
