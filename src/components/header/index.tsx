import React from 'react'; 
import { Badge } from '../badge';
import { Search } from '../search';
import './header.scss';
import {ReactComponent as StoreIcon} from '../../assets/icons/store-outline.svg';


export const Header: React.FC = () => (
    <header className="header container">
            <div className="logo">
                <span>play<strong>food</strong></span>
            </div>
            <div className="search__content d-flex row">
                <Search placeholder="Search"/>
                <div className="d-flex h-full row align-center justify-center ml-3 count__info">
                <StoreIcon />
                <div className="ml-1">
                <Badge ><div className="badge__content">03</div></Badge>
                </div>
                </div>
            </div>
    </header>
)
