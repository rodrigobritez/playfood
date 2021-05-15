import React, { useState } from 'react';
import './card.scss';
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg';
import { ReactComponent as AlertIcon } from '../../assets/icons/alert.svg';
import { ReactComponent as ChevronDown } from '../../assets/icons/chevron-down.svg';
import { ReactComponent as ChevronUp } from '../../assets/icons/chevron-up.svg';

enum EStatus {
    Finished = 1,
    Analysis = 2,
}

interface ICard {
    status?: EStatus
}

export const Card: React.FC<ICard> = ({status}) => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <>
            <div>
                <div className="card">
                    <div className="d-flex align-center">
                        <div className="badge d-flex column  align-center justify-center">
                            {status === 1 ? <CheckIcon fill="#503E9D" /> : <AlertIcon fill="#503E9D" />}
                            
                        </div>
                        <div className="d-flex column ml-2">
                            <p className="date">12/04/2021</p>
                            <p className="code">2cd1e459-eba1-40ce-bdf7-84bf83550153</p>
                        </div>
                    </div>
                    <div className="d-flex row align-center">
                        <p className="total">R$ 40,30</p>
                        {showDetails ? 
                        <ChevronUp onClick={() => setShowDetails(false)} className="ml-3 mr-2 icon" fill="#503E9D" /> : 
                        <ChevronDown onClick={() => setShowDetails(true)} className="ml-3 mr-2 icon" fill="#503E9D" />}
                    </div>
                </div>
                {showDetails &&
                    <div className="info">
                        <div className="d-flex row justify-between">
                            <span>2x Orange Juice</span>
                            <span>R$ 40,30</span>
                        </div>
                    </div>}

            </div>
        </>
    )
}
