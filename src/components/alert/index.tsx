import React, { useEffect, useState } from 'react';
import './alert.scss';
import { IAlert } from '../../utils/interfaces'

export const Alert: React.FC<IAlert> = ({ show, message }) => {
    const [display, setDisplay] = useState(show)
    useEffect(() => {
        if (show) {
            setTimeout(() => {
                setDisplay(false)
            }, 2000)
        }
    }, [show])
    return (
        <>
        { display && <div className="alert">
            <span>{message}</span>
        </div>}
        </>
    )

}
