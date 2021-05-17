import React from 'react'; 
import './input.scss';
import "./mask"

interface IInput {
    type: string,
    label: string,
    placeholder?: string,
    value?: string,
    objectKey?: string,
    setValue?: Function | any,
    mask?: string
}

export const Input: React.FC<IInput> = ({label, type, placeholder, value, setValue, objectKey, mask}) => {
    return(
        <>
        {type === 'text' &&
            <div>
                <label className="label">{label}</label>
                <input placeholder={  mask ? mask : placeholder } data-slots={mask ? "X" : null} value={value} onChange={(e) =>  setValue(e.target.value, objectKey)} className="input" />
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
