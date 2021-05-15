import React from 'react'; 
import { Card } from '../card';
import './list.scss';

interface IList {
    items?: Array<unknown>
}

export const List: React.FC<IList> = () => (
    <>
        <div className="list">
            <Card />
            <Card />
            <Card />
        </div>
    </>
)
