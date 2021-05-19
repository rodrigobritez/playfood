import { Uuid } from '../services/customHooks'
import { IOrder, IProduct } from '../utils/interfaces'

export function createOrderStore(){
    return {
        orders: [] as any,
        createOrder(obj: IOrder){
            const order = {...obj}
            order["id"] = Uuid()
            order["datetime"] = new Date().toLocaleString();
            this.orders.push(order)
        },
        removeOrder(id: string | number ){
            this.orders = this.orders.filter((item: IProduct) => item.id !== Number(id));
        },
        loadOrders(orders: Array<IOrder>){
            this.orders = orders;
        }
    }
}