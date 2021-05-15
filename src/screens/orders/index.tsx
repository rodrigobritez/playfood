import React from 'react'; 
import { Header } from '../../components/header'
import { List } from '../../components/list'
import "./orders.scss"

export const Orders: React.FC = () => (
    <>
    <Header />
    <section className="container mt-3">
        <h2 className="title">My Orders</h2>
        <span className="subtitle">Pull down to see all your orders.</span>
        <div className="mt-3">
            <List />
        </div>
    </section>
    </>
)
