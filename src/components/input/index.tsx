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
    mask?: string,
    data?: Array<IProduct>
}

interface IProduct {
    id: string | number,
    category: string,
    name: string,
    price: number,
    amount: number,
}

export const Input: React.FC<IInput> = ({label, type, placeholder, value, setValue, objectKey, mask, data}) => {
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
                    {
                        data && data.map(product => (
                            <option key={product.id} value={product.id}>{product.name}</option>
                        ))
                    }
                </select>
            </div>
        }
        </>
    ) 
}
