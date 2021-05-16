import React, { useState } from 'react';
import "./orders.scss"
import { Button } from '../../components/button';
import { Header } from '../../components/header'
import { List } from '../../components/list'
import { Modal } from '../../components/modal';
import { Input } from '../../components/input';
import { ReactComponent as ArrowRight } from '../../assets/icons/arrow-right.svg';

export const Orders: React.FC = () => {
    const [openModal, setOpenModal] = useState<Boolean>(false);

    return (
        <>
            <Header />
            <section className="container mt-2 ">
                <div className="d-flex justify-between align-center">
                    <div>
                        <h2 className="title">My Orders</h2>
                        <span className="subtitle">Pull down to see all your orders.</span>
                    </div>
                </div>
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
                <div className="modal__content">
                <div className="container mt-3 ">
                    <div className="d-flex align-center">
                        <div onClick={() => setOpenModal(false)} className="badge d-flex justify-center align-center primary pointer">
                            <ArrowRight fill="#FFF" />
                        </div>
                        <p className="ml-3 title">New order</p>
                    </div>
                    <div className="mt-2">
                        <Input type="text" placeholder="Ex: Noah" label="Name" />
                        <div className="mt-2">
                            <Input type="select" label="Food" />
                            <div className="box">
                                <div className="product-card d-flex row justify-between align-center">
                                    <div>
                                        <p className="product-card__title">Gourmet Chef Salad Platter</p>
                                        <p className="product-card__price">R$ 20,40</p>
                                    </div>
                                    <div className="counter">
                                        <span>-</span>
                                        <span>03</span>
                                        <span>+</span>
                                    </div>
                                </div>
                                <hr className="mt-1 opacity-25" />
                            </div>
                        </div>
                        <div className="mt-2">
                            <Input type="select" label="Drink" />
                            <div className="box">
                                <div className="product-card d-flex row justify-between align-center">
                                    <div>
                                        <p className="product-card__title">Gourmet Chef Salad Platter</p>
                                        <p className="product-card__price">R$ 20,40</p>
                                    </div>
                                    <div className="counter">
                                        <span>-</span>
                                        <span>03</span>
                                        <span>+</span>
                                    </div>
                                </div>
                                <hr className="mt-1 opacity-25" />
                            </div>
                        </div>
                        <div className="mt-2">
                            <Input type="text" label="Credit Card Holder Name" placeholder="Ex: Noah Junior" />
                        </div>
                        <div className="mt-2">
                            <Input type="text" label="Credit Card Number" placeholder="Ex: 1234 5678 9101 1213" />
                        </div>
                        <div className="d-flex mt-2">
                            <div className="mr-1">
                                <Input type="text" label="CVV" placeholder="Ex: 123" />
                            </div>
                            <div className="ml-1">
                                <Input type="text" label="Expiration Date" placeholder="Ex: 08/27" />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="modal__content__total-label"><span>TOTAL:</span><span>R$ 20,30</span></div>
                <button className="modal__content__button">Finish  <ArrowRight fill="#FFF" /></button>
                </div>
            </Modal>
        </>
    )
}


