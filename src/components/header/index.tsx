import React from 'react';
import { Search } from '../search';
import './header.scss';
import { ReactComponent as GraphIcon } from '../../assets/icons/graph.svg';
import { useHistory } from 'react-router';
import { useOrdersStore } from '../../contexts/ordersContext';

interface IHeader {
    showBilling?: Boolean,
    searchCallback?: Function,
}

export const Header: React.FC<IHeader> = ({ showBilling, searchCallback }) => {
    const history = useHistory();
    const ordersStore = useOrdersStore()
    return (
        <header className="header">
            <div className="header__block container">
                <div className="logo">
                    <span>play<strong>food</strong></span>
                </div>
                <div className="search__content d-flex row">
                {showBilling && ordersStore && ordersStore?.orders.length > 0 && <><Search placeholder="Search by id" searchCallback={searchCallback ? searchCallback : () => null}/>
                     <div onClick={() => history.push("/billing")} className="icon-billing ml-2 count__info">
                        <span>Billing</span>
                        <GraphIcon fill="#503E9D" />
                    </div></>}
                </div>
            </div>
        </header>
    )
}
