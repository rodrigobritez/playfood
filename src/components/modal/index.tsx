import React from 'react'; 
import './modal.scss';



export const Modal: React.FC= ({children}) => {
    return(
        <>
            <div className="modal">
                {children}
            </div> 
        </>
    )
}
