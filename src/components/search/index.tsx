import React from 'react'; 
import './search.scss';
import {ReactComponent as SearchIcon} from '../../assets/icons/search-icon.svg';

interface ISearch {
    placeholder?: string
}

export const Search: React.FC<ISearch> = ({placeholder}) => (
    <>
    <div className="input__block">
        <input placeholder={placeholder} />
        <SearchIcon className="search-icon"/>
    </div>
    </>
)
