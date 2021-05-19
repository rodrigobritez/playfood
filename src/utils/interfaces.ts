export interface IOrder {
    id: string,
    datetime: string,
    name: string,
    holder_name: string,
    card_number: string,
    cvv: number | string,
    total: number | string,
    expiration_date: string,
    food: Array<IProduct >
    drink: Array<IProduct >,
    status: number,
}

export interface IProduct {
    id: string | number,
    category: string,
    name: string,
    price: number,
    amount: number,
}


export interface IOrderStore{
    orders: Array<IOrder>,
    createOrder: Function,
    removeOrder: Function,
    loadOrders: Function
}