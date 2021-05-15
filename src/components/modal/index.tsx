import React, { useEffect, useRef } from 'react'; 
import './modal.scss';

interface IModal{
    active?: Boolean,
}

export const Modal: React.FC<IModal> = ({children, active}) => {
    let modal: any = useRef()
    useEffect(() => {
        if(active){
            modal.current.classList.add('active')
        }else{
            modal.current.classList.remove('active')
        }
    }, [active])
    return(
        <>
        <div ref={modal} className="modal">
            {children}
        </div>
        </>
    )
}
