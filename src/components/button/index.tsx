import React from 'react'; 
import './button.scss';

interface IButton {
    onClick: Function
}

export const Button: React.FC<IButton> = ({children, onClick}) => (
    <>
    <button onClick={() => onClick()}>{children}</button> 
    </>
)
