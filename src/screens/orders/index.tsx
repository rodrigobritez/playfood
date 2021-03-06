import React, { useEffect, useState } from 'react';
import "./orders.scss"
import { Button } from '../../components/button';
import { Header } from '../../components/header'
import { Modal } from '../../components/modal';
import { Card } from '../../components/card'
import { Input } from '../../components/input';
import { ReactComponent as ArrowRight } from '../../assets/icons/arrow-right.svg';
import { api } from '../../services/api';
import { useMoney } from '../../services/customHooks';
import { IProduct, IOrder } from '../../utils/interfaces'
import { useOrdersStore } from '../../contexts/ordersContext';
import { useObserver } from 'mobx-react-lite';
import { ccValidator } from '../../utils/validators'
import { Alert } from '../../components/alert';



export const Orders = () => {
    const [openModal, setOpenModal] = useState<Boolean>(false);
    const [food, setFood] = useState([]);
    const [drink, setDrink] = useState([]);
    const [orders, setOrders] = useState<Array<IOrder>>([])
    const [products, setProdcts] = useState([]);
    const [alertProps, setAlertProps] = useState({
        show: false,
        message: ""
    })
    const [order, setOrder] = useState<IOrder>({
        id: "",
        datetime: "",
        name: "",
        holder_name: "",
        card_number: "",
        cvv: "",
        total: 0,
        expiration_date: "",
        food: [],
        drink: [],
        status: 0,
    });
    const formatMoney = useMoney();
    const ordersStore = useOrdersStore()


    useEffect(() => {
        api.get('products').then(res => res.data).then(products => {
            setDrink(products.filter((item: IProduct) => item.category === 'drink'));
            setFood(products.filter((item: IProduct) => item.category === 'food'));
            setProdcts(products);
            
        }).catch(err => {
            setAlertProps({
                show: true,
                message: "[Server Error] Try again."
            })
        })
    }, [])


    useEffect(() =>{
        if(localStorage.getItem("@orders")){
            ordersStore?.loadOrders(JSON.parse(localStorage.getItem("@orders")||""))
            setOrders(ordersStore?.orders||[])
        }
    }, [ordersStore])

 
    const changeValuesInOrder = (value: unknown, key: string) => {
        setOrder({ ...order, [key]: value })
    }

    const addProduct = (id: string | number, category: string) => {
        if (category === "food") {
            const tmp_food: Array<IProduct> = [...order.food]
            const index = order.food.findIndex((item: IProduct) => item.id === Number(id));
            tmp_food[index].amount = tmp_food[index].amount + 1;
            changeValuesInOrder(tmp_food, 'food');
        } else {
            const tmp_drink: Array<IProduct> = [...order.drink]
            const index = order.drink.findIndex((item: IProduct) => item.id === Number(id));
            tmp_drink[index].amount = tmp_drink[index].amount + 1;
            changeValuesInOrder(tmp_drink, 'drink');
        }
    }

    const subProduct = (id: string | number, category: string) => {
        if (category === "food") {
            let tmp_food: Array<IProduct> = [...order.food]
            const index = order.food.findIndex((item: IProduct) => item.id === Number(id));
            if (tmp_food[index].amount > 1) {
                tmp_food[index].amount = tmp_food[index].amount - 1;
            } else {
                tmp_food = tmp_food.filter(item => item.id !== id);
            }
            changeValuesInOrder(tmp_food, 'food');
        } else {
            let tmp_drink: Array<IProduct> = [...order.drink]
            const index = order.drink.findIndex((item: IProduct) => item.id === Number(id));
            if (tmp_drink[index].amount > 1) {
                tmp_drink[index].amount = tmp_drink[index].amount - 1;
            } else {
                tmp_drink = tmp_drink.filter(item => item.id !== id);
            }
            changeValuesInOrder(tmp_drink, 'drink');
        }
    }

    const totalOrder = () => formatMoney(order.drink.reduce((a, c) => a += c.price * c.amount, 0) + (order.food.reduce((a, c) => a += c.price * c.amount, 0)))

    const selectProduct = (id: string | number) => {
        const product: IProduct | any = products.find((item: IProduct) => item.id === Number(id));

        if (product?.category === "food") {
            const tmp_food: Array<IProduct> = [...order.food]
            const index = order.food.findIndex((item: IProduct) => item.id === Number(id));
            if (index > -1) {
                tmp_food[index].amount = tmp_food[index].amount + 1;
                changeValuesInOrder(tmp_food, 'food');
            }
            else {
                tmp_food.push({
                    ...product,
                    amount: 1
                })
                changeValuesInOrder(tmp_food, 'food');
            }
        } else {
            const tmp_drink: Array<IProduct> = [...order.drink]
            const index = order.drink.findIndex((item: IProduct) => item.id === Number(id));
            if (index > -1) {
                tmp_drink[index].amount = tmp_drink[index].amount + 1;
                changeValuesInOrder(tmp_drink, 'drink');
            }
            else {
                tmp_drink.push({
                    ...product,
                    amount: 1
                })
                changeValuesInOrder(tmp_drink, 'drink');
            }
        }


    }

    const generateOrder = () => {
        if(!order.name){
            setAlertProps({
                show: true,
                message: "Enter a valid name."
            })
            return false
        }
        if(!order.holder_name || !order.card_number || !order.cvv || !order.expiration_date){
            setAlertProps({
                show: true,
                message: "Check that the card details have been filled in correctly!"
            })
            return false
        }
        if(order.food.length === 0 && order.drink.length === 0){
            setAlertProps({
                show: true,
                message: "Select an item to place the order!"
            })
            return false
        }
        if(!ccValidator(order.card_number.replace(/\s/g, ''))){
            setAlertProps({
                show: true,
                message: "Insert a valid credit card!"
            })
            return false
        }

        try{
            const new_order = {...order, total: totalOrder(), status: Math.floor(Math.random() * 2) + 1}
            ordersStore?.createOrder(new_order);
            localStorage.setItem("@orders", JSON.stringify(ordersStore?.orders));
            setOrders(ordersStore?.orders||[])
            setOrder({
                id: "",
                datetime: "",
                name: "",
                holder_name: "",
                card_number: "",
                cvv: "",
                total: 0,
                expiration_date: "",
                food: [],
                drink: [],
                status: 0,
            })
            setOpenModal(false);
        }catch(e: unknown){
            setAlertProps({
                show: true,
                message: "Error placing order, please try again later."
            })
        }
    }

    const searchCallback = (query: string) => {
        const origin_orders = ordersStore?.orders
        const result = orders.filter((item: IOrder) => item.id.split('-')[0].slice(0,4) === query)
        if(result && result?.length > 0){
           setOrders(result);
        }else{
           setOrders(origin_orders||[]);
        }
    }
   
    return useObserver(() =>  (
        <>
            <Header showBilling={true} searchCallback={searchCallback} />
            <section className="container mt-2 ">
                <div className="d-flex justify-between align-center">
                    <div>
                        <h2 className="title">My Orders</h2>
                        <span className="subtitle">Pull down to see all your orders.</span>
                    </div>
                </div>
                {orders && orders.length > 0 ? 
                <div className="mt-1 box list ">
                {orders && orders.map((orderItem: IOrder) => (
                    <Card key={orderItem.id} title={orderItem.datetime} subtitle={orderItem.id} value={orderItem.total} showDescription={true} descriptionData={orderItem.food.concat(orderItem.drink)} status={orderItem.status} />
                ))}
                </div>:<div className="mt-1 box list not-found-box">
                    <p>No orders were found, make a new one using the button below. </p>
                </div>}
                
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
                                    <div className="box box-store">
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
                                    <div className="box box-store">
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
                                <Input type="text" value={order.holder_name} label="Credit Card Holder Name" objectKey="holder_name" setValue={changeValuesInOrder} placeholder="Ex: Noah Junior" />
                            </div>
                            <div className="mt-2">
                                <Input type="text" mask="9999 9999 9999 9999" label="Credit Card Number" value={order.card_number} objectKey="card_number" setValue={changeValuesInOrder} placeholder="XXXX XXXX XXXX XXXX" />
                            </div>
                            <div className="d-flex mt-2 mb-10">
                                <div className="mr-1">
                                    <Input type="text" label="CVV" mask="999" objectKey="cvv" value={String(order.cvv)} setValue={changeValuesInOrder} placeholder="XXX" />
                                </div>
                                <div className="ml-1">
                                    <Input type="text" mask="99/99" label="Expiration Date" value={String(order.expiration_date)}  objectKey="expiration_date" setValue={changeValuesInOrder} placeholder="XX/XX" />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="modal__content__total-label"><span>TOTAL:</span><span>{totalOrder()}</span></div>
                    <button onClick={() => generateOrder()} className="modal__content__button pointer">Finish  <ArrowRight fill="#FFF" /></button>
                </div>
            </Modal>
            <Alert {...alertProps} callbackAlert={setAlertProps}/>
        </>
    ))
}


