import React from 'react'; 
import './input.scss';

interface IInput {
    type: string,
    label: string,
    placeholder?: string,
}

export const Input: React.FC<IInput> = ({label, type, placeholder}) => {
    return(
        <>
        {type === 'text' &&
            <div>
                <label className="label">{label}</label>
                <input className="input" placeholder={placeholder}/>
            </div>
        }
        {type === 'select' &&
            <div>
                <label className="label">{label}</label>
                <select className="select">
                    <option defaultValue={1}>Select your option</option>
                </select>
            </div>
        }
        </>
    ) 
}
