import React, { createContext, useContext } from 'react';
import { createOrderStore } from '../store/orders';
import { IOrderStore } from '../utils/interfaces'
import { useLocalStore } from 'mobx-react'

const OrdersContext = createContext<IOrderStore | null >(null)

export const OrdersProvider: React.FC = ({children}) => {
    const ordersStore =  useLocalStore(createOrderStore)
    return(
        <OrdersContext.Provider value={ordersStore}>
            {children}
        </OrdersContext.Provider>
    )
}

export const useOrdersStore = () => useContext(OrdersContext);