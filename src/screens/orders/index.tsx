import React, { useState } from 'react';
import "./orders.scss"
import { Button } from '../../components/button';
import { Header } from '../../components/header'
import { List } from '../../components/list'
import { Modal } from '../../components/modal';
import { Input } from '../../components/input';
import { ReactComponent as ArrowRight } from '../../assets/icons/arrow-right.svg';

interface IOrder {
    id: string | number,
    datetime: string,
    name: string,
    holder_name: string,
    card_number: string,
    cvv: number,
    expiration_date: string,
    food: Array<IProduct | void>
    drink: Array<IProduct | void>
}

interface IProduct {
    id: string | number,
    category: string,
    name: string,
    price: number,
    amount: number,
}

export const Orders: React.FC = () => {
    const [openModal, setOpenModal] = useState<Boolean>(true);
    const [order, setOrder] = useState<IOrder>({
        id: 0,
        datetime: "",
        name: "",
        holder_name: "",
        card_number: "",
        cvv: 0,
        expiration_date: "",
        food: [],
        drink: []
    })


    const changeValuesInOrder = (value: unknown, key: string) => {
        setOrder({ ...order, [key]: value })
    }


    return (
        <>
            <Header showBilling={true} />
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
                            <Input type="text" value={order.name} placeholder="Ex: Noah" objectKey="name" setValue={changeValuesInOrder} label="Name" />
                            <div className="mt-2">
                                <Input type="select" label="Select your food" />
                                {order.food.length > 0 && (
                                    <div className="box">
                                        {
                                            order.food.map(food => (
                                                <>
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
                                                </>
                                            ))
                                        }

                                    </div>
                                )}
                            </div>
                            <div className="mt-2">
                                <Input type="select" label="Select your drink" />
                                {order.drink.length > 0 && (
                                    <div className="box">
                                        {
                                            order.drink.map(drink => (
                                                <>
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
                                                </>
                                            ))
                                        }

                                    </div>
                                )}

                            </div>
                            <div className="mt-2">
                                <Input type="text" label="Credit Card Holder Name" objectKey="holder_name" setValue={changeValuesInOrder} placeholder="Ex: Noah Junior" />
                            </div>
                            <div className="mt-2">
                                <Input type="text" label="Credit Card Number" objectKey="card_number" setValue={changeValuesInOrder} mask="XXXX XXXX XXXX XXXX" />
                            </div>
                            <div className="d-flex mt-2">
                                <div className="mr-1">
                                    <Input type="text" mask="XXX" label="CVV" objectKey="cvv" setValue={changeValuesInOrder}  />
                                </div>
                                <div className="ml-1">
                                    <Input type="text" label="Expiration Date" objectKey="expiration_date" setValue={changeValuesInOrder} mask="XX/XX" />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="modal__content__total-label"><span>TOTAL:</span><span>R$ 20,30</span></div>
                    <button onClick={() => console.log(order)} className="modal__content__button pointer">Finish  <ArrowRight fill="#FFF" /></button>
                </div>
            </Modal>
        </>
    )
}


