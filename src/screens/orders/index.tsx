import React, { useEffect, useState } from 'react';
import "./orders.scss"
import { Button } from '../../components/button';
import { Header } from '../../components/header'
import { List } from '../../components/list'
import { Modal } from '../../components/modal';
import { Input } from '../../components/input';
import { ReactComponent as ArrowRight } from '../../assets/icons/arrow-right.svg';
import { api } from '../../services/api';
import { useMoney, Uuid } from '../../services/customHooks';

interface IOrder {
    id: string,
    datetime: string,
    name: string,
    holder_name: string,
    card_number: string,
    cvv: number,
    expiration_date: string,
    food: Array<IProduct >
    drink: Array<IProduct >
}

interface IProduct {
    id: string | number,
    category: string,
    name: string,
    price: number,
    amount: number,
}

export const Orders: React.FC = () => {
    const [openModal, setOpenModal] = useState<Boolean>(false);
    const [food, setFood] = useState([]);
    const [drink, setDrink] = useState([]);
    const [products, setProdcts] = useState([]);
    const [order, setOrder] = useState<IOrder>({
        id: Uuid(),
        datetime: new Date().toLocaleString(),
        name: "",
        holder_name: "",
        card_number: "",
        cvv: 0,
        expiration_date: "",
        food: [],
        drink: []
    });

    const formatMoney = useMoney();

 
    useEffect(() => {
        api.get('products').then(res => res.data).then(products => {
            setDrink(products.filter((item: IProduct) => item.category === 'drink'));
            setFood(products.filter((item: IProduct) => item.category === 'food'));
            setProdcts(products);
        })
    }, [])

    const changeValuesInOrder = (value: unknown, key: string) => {
        setOrder({ ...order, [key]: value })
    }

    const addProduct = (id: string | number, category: string) => {
        if(category === "food"){
            const tmp_food: Array<IProduct> = [...order.food]
            const index = order.food.findIndex((item: IProduct) => item.id === Number(id));
            tmp_food[index].amount = tmp_food[index].amount + 1;
            changeValuesInOrder(tmp_food, 'food');
        }else{
            const tmp_drink: Array<IProduct> = [...order.drink]
            const index = order.drink.findIndex((item: IProduct) => item.id === Number(id));
            tmp_drink[index].amount = tmp_drink[index].amount + 1;
            changeValuesInOrder(tmp_drink, 'drink');
        }
    }

    const subProduct = (id: string | number, category: string) => {
        if(category === "food"){
            let tmp_food: Array<IProduct> = [...order.food]
            const index = order.food.findIndex((item: IProduct) => item.id === Number(id));
            if(tmp_food[index].amount > 1){
                tmp_food[index].amount = tmp_food[index].amount - 1;
            }else{
                tmp_food = tmp_food.filter(item => item.id !== id);
            }
            changeValuesInOrder(tmp_food, 'food');
        }else{
            let tmp_drink: Array<IProduct> = [...order.drink]
            const index = order.drink.findIndex((item: IProduct) => item.id === Number(id));
            if(tmp_drink[index].amount > 1){
                tmp_drink[index].amount = tmp_drink[index].amount - 1;
            }else{
                tmp_drink = tmp_drink.filter(item => item.id !== id);
            }
            changeValuesInOrder(tmp_drink, 'drink');
        }
    }

    const selectProduct = (id: string | number) => {
        const product: IProduct | any  = products.find((item: IProduct) => item.id === Number(id)); 
        
        if(product?.category === "food"){
            const tmp_food: Array<IProduct> = [...order.food]
            const index = order.food.findIndex((item: IProduct) => item.id === Number(id));
            if(index > -1){
                tmp_food[index].amount = tmp_food[index].amount + 1;
                changeValuesInOrder(tmp_food, 'food');
            }
            else{
                tmp_food.push({
                    ...product,
                    amount: 1
                })
                changeValuesInOrder(tmp_food, 'food');
            }   
        }else{
            const tmp_drink: Array<IProduct> = [...order.drink]
            const index = order.drink.findIndex((item: IProduct) => item.id === Number(id));
            if(index > -1){
                tmp_drink[index].amount = tmp_drink[index].amount + 1;
                changeValuesInOrder(tmp_drink, 'drink');
            }
            else{
                tmp_drink.push({
                    ...product,
                    amount: 1
                })
                changeValuesInOrder(tmp_drink, 'drink');
            } 
        }
        
        
    }

    const generateOrder = () => {
        console.log(order)
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
                                <Input type="select" data={food} selectProduct={selectProduct} label="Select your food" />
                                {order.food.length > 0 && (
                                    <div className="box">
                                        {
                                            order.food.map(food => (
                                                
                                                    <div key={food.id} className="product-card d-flex row justify-between align-center">
                                                        <div>
                                                            <p className="product-card__title">{food.name}</p>
                                                            <p className="product-card__price">{formatMoney(food.amount * food.price)}</p>
                                                        </div>
                                                        <div className="counter">
                                                            <span onClick={() => subProduct(food.id, "food")}>-</span>
                                                            <span>{food.amount}</span>
                                                            <span onClick={() => addProduct(food.id, "food")}>+</span>
                                                        </div>
                                                    </div>
                                                
                                            ))
                                        }

                                    </div>
                                )}
                            </div>
                            <div className="mt-2">
                                <Input type="select" data={drink} selectProduct={selectProduct} label="Select your drink" />
                                {order.drink.length > 0 && (
                                    <div className="box">
                                        {
                                            order.drink.map(drink => (
                                                
                                                    <div key={drink.id} className="product-card d-flex row justify-between align-center">
                                                        <div>
                                                            <p className="product-card__title">{drink.name}</p>
                                                            <p className="product-card__price">{formatMoney(drink.amount * drink.price)}</p>
                                                        </div>
                                                        <div className="counter">
                                                            <span onClick={() => subProduct(drink.id, "drink")}>-</span>
                                                            <span>{drink.amount}</span>
                                                            <span onClick={() => addProduct(drink.id, "drink")}>+</span>
                                                        </div>
                                                    </div>
                                                
                                            ))
                                        }

                                    </div>
                                )}

                            </div>
                            <div className="mt-2">
                                <Input type="text" label="Credit Card Holder Name" objectKey="holder_name" setValue={changeValuesInOrder} placeholder="Ex: Noah Junior" />
                            </div>
                            <div className="mt-2">
                                <Input type="text" label="Credit Card Number" objectKey="card_number" setValue={changeValuesInOrder} placeholder="XXXX XXXX XXXX XXXX" />
                            </div>
                            <div className="d-flex mt-2">
                                <div className="mr-1">
                                    <Input type="text"  label="CVV" objectKey="cvv" setValue={changeValuesInOrder} placeholder="XXX" />
                                </div>
                                <div className="ml-1">
                                    <Input type="text" label="Expiration Date" objectKey="expiration_date" setValue={changeValuesInOrder} placeholder="XX/XX" />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="modal__content__total-label"><span>TOTAL:</span><span>R$ 20,30</span></div>
                    <button onClick={() => generateOrder()} className="modal__content__button pointer">Finish  <ArrowRight fill="#FFF" /></button>
                </div>
            </Modal>
        </>
    )
}


