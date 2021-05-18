import React, { useState } from 'react';
import './card.scss';
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg';
import { ReactComponent as AlertIcon } from '../../assets/icons/alert.svg';
import { ReactComponent as ChevronDown } from '../../assets/icons/chevron-down.svg';
import { ReactComponent as ChevronUp } from '../../assets/icons/chevron-up.svg';
import { IProduct } from '../../utils/interfaces';
import { useMoney } from '../../services/customHooks';

enum EStatus {
    Finished = 1,
    Analysis = 2,
}

interface ICard {
    status?: EStatus,
    title: string,
    subtitle: string,
    value: string | number,
    showDescription: boolean,
    descriptionData: Array<IProduct|unknown>
}


export const Card: React.FC<ICard> = ({status, title, subtitle, value, showDescription, descriptionData}) => {
    const [showDetails, setShowDetails] = useState(false);
    const formatMoney = useMoney()
    return (
        <>
            <div>
                <div className="card">
                    <div className="d-flex align-center">
                        <div className="badge d-flex column  align-center justify-center">
                            {status === 1 ? <CheckIcon fill="#503E9D" /> : <AlertIcon fill="#503E9D" />}
                            
                        </div>
                        <div className="d-flex column ml-2">
                            <p className="date">{title}</p>
                            <p className="code">{subtitle}</p>
                        </div>
                    </div>
                    <div className="d-flex row align-center">
                        <p className="total">{formatMoney(value)}</p>
                        {!showDetails ? 
                        <ChevronUp onClick={() => setShowDetails(true)} className="ml-3 mr-2 icon" fill="#503E9D" /> : 
                        <ChevronDown onClick={() => setShowDetails(false)} className="ml-3 mr-2 icon" fill="#503E9D" />}
                    </div>
                </div>
                {(showDetails) &&
                    <div className="info">
                        {descriptionData.map((product: any) => (
                        <div key={product.id} className="d-flex row justify-between">
                            <span>{product.amount}x {product.name}</span>
                            <span>{formatMoney(product.price * product.amount)}</span>
                        </div>
                        ))}
                    </div>}

            </div>
        </>
    )
}
