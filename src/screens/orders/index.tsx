import React from 'react'; 
import { Button } from '../../components/button';
import { Header } from '../../components/header'
import { List } from '../../components/list'
import { ReactComponent as ArrowRight } from '../../assets/icons/arrow-right.svg';

import "./orders.scss"
import { Modal } from '../../components/modal';

export const Orders: React.FC = () => (
    <>
    <Header />
    <section className="container mt-2">
        <h2 className="title">My Orders</h2>
        <span className="subtitle">Pull down to see all your orders.</span>
        <div className="mt-1 box">
            <List />
        </div>
        <div className="mt-2 d-flex justify-end">
            <Button>
                New order
                <ArrowRight className="ml-3" fill="#503E9D" />
            </Button>
        </div>
    </section>
    <Modal>
        a
    </Modal>
    </>
)
