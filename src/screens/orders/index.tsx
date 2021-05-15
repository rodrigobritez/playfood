import React, { useState } from 'react'; 
import { Button } from '../../components/button';
import { Header } from '../../components/header'
import { List } from '../../components/list'
import { ReactComponent as ArrowRight } from '../../assets/icons/arrow-right.svg';

import "./orders.scss"
import { Modal } from '../../components/modal';

export const Orders: React.FC = () => {
    const [openModal, setOpenModal] = useState<Boolean>(false);
    return(
        <>
            <Header />
            <section className="container mt-2">
                <h2 className="title">My Orders</h2>
                <span className="subtitle">Pull down to see all your orders.</span>
                <div className="mt-1 box">
                    <List />
                </div>
                <div className="mt-2 d-flex justify-end">
                    <Button onClick={() => setOpenModal(true)}>
                        New order
                        <ArrowRight className="ml-3" fill="#503E9D" />
                    </Button>
                </div>
            </section>
            <Modal active={openModal}>
                <div className="container mt-3 modal__content">
                    <div className="d-flex align-center">
                        <div onClick={() => setOpenModal(false)} className="badge d-flex justify-center align-center primary pointer">
                            <ArrowRight fill="#FFF" />
                        </div>
                        <p className="ml-3 title">New order</p>
                    </div>
                    
                </div>
            </Modal>
        </>
    )
}
 

