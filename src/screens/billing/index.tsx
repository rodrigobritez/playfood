import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Card } from '../../components/card';
import { Header } from '../../components/header';
import { useOrdersStore } from '../../contexts/ordersContext';
import { useMoney } from '../../services/customHooks';
import { IOrder, IProduct } from '../../utils/interfaces'
import "./billing.scss"


export const Billing: React.FC = () => {
    const ordersStore = useOrdersStore()
    const [food, setFood] = useState<Array<IProduct>>([])
    const [drink, setDrink] = useState<Array<IProduct>>([])
    const formatMoney = useMoney()
    const history = useHistory()

    useEffect(() => {
        if (ordersStore && ordersStore?.orders.length > 0) {
            const storeFood: Array<IProduct> = []
            ordersStore?.orders.forEach((order: IOrder) => {
                order.food.forEach((product: IProduct) => {
                    const index = storeFood.findIndex(item => item.id === product.id)
                    if (index > -1) {
                        storeFood[index].amount += product.amount
                        storeFood[index].price += product.price * storeFood[index].amount
                    } else {
                        storeFood.push(product)
                    }
                })
            })
            setFood(storeFood)
            const storeDrink: Array<IProduct> = []
            ordersStore?.orders.forEach((order: IOrder) => {
                order.drink.forEach((product: IProduct) => {
                    const index = storeDrink.findIndex(item => item.id === product.id)
                    if (index > -1) {
                        storeDrink[index].amount += product.amount
                        storeDrink[index].price += product.price * storeDrink[index].amount
                    } else {
                        storeDrink.push(product)
                    }
                })
            })
            setDrink(storeDrink)
        }else{
            history.goBack()
        }

    }, [ordersStore, history])


    return (
        <>
            <Header />
            <section className="container mt-2">
                <div>
                    <h2 className="title">Billing</h2>
                    <span className="subtitle">Pull down to see all billing.</span>
                </div>
                <div className="d-flex row justify-between align-center mt-1 lists">
                    <div className="w-full mt-1">
                        <div className="title">Food list </div>
                        <div className="box list">
                            {food.map((product: IProduct) => (
                                <Card key={product.id} title={`${product.amount}x ${product.name}`} subtitle={`${product.description.slice(0, 40)}...`} value={product.price} showDescription={false} status={1} />
                            ))}
                        </div>
                    </div>
                    <div className="w-full mt-1">
                        <div className="title">Drink list </div>
                        <div className="box list">
                            {drink.map((product: IProduct) => (
                                <Card key={product.id} title={`${product.amount}x ${product.name}`} subtitle={product.description && `${product.description.slice(0, 40)}...`} value={product.price} showDescription={false} status={1} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <div className="total__price">
                <span>TOTAL:</span>
                <span>{formatMoney(drink.reduce((a, c) => a += c.price * c.amount, 0) + (food.reduce((a, c) => a += c.price * c.amount, 0)))}</span>
            </div>
        </>
    )
}
