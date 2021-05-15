import React from 'react'; 
import './badge.scss';

export const Badge: React.FC = ({children}) => (
    <div className="badge">
        {children}
    </div>
)
