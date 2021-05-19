import React, { useEffect, useState } from 'react';
import './alert.scss';
import { IAlert } from '../../utils/interfaces'

export const Alert: React.FC<IAlert> = ({ show, message, callbackAlert }) => {
    const [display, setDisplay] = useState(show)

    useEffect(() => {
        if(show){
            setDisplay(true);
            setTimeout(() => {
                callbackAlert({message: "", show: false})
                setDisplay(false)
            }, 5000)
        }
    }, [show, callbackAlert])
    
    return (
        <>
        { display && <div className="alert">
            <span>{message}</span>
        </div>}
        </>
    )

}
