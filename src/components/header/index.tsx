import React from 'react';
import { Search } from '../search';
import './header.scss';
import { ReactComponent as GraphIcon } from '../../assets/icons/graph.svg';

interface IHeader {
    showBilling?: Boolean
}

export const Header: React.FC<IHeader> = ({ showBilling }) => {
    return (
        <header className="header">
            <div className="header__block container">
                <div className="logo">
                    <span>play<strong>food</strong></span>
                </div>
                <div className="search__content d-flex row">
                    <Search placeholder="Search" />
                    {showBilling && <div className="icon-billing ml-2 count__info">
                        <span>Billing</span>
                        <GraphIcon fill="#FFF" />
                    </div>}
                </div>
            </div>
        </header>
    )
}
