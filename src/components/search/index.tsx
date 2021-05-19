import React from 'react'; 
import './search.scss';
import {ReactComponent as SearchIcon} from '../../assets/icons/search-icon.svg';

interface ISearch {
    placeholder?: string,
    searchCallback: Function
}

export const Search: React.FC<ISearch> = ({placeholder, searchCallback}) => (
    <>
    <div className="input__block">
        <input onChange={(e) => searchCallback(e.target.value)} placeholder={placeholder} />
        <SearchIcon className="search-icon"/>
    </div>
    </>
)
