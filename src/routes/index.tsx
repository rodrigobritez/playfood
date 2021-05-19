import { Route } from 'react-router-dom'
import { Billing } from '../screens/billing'
import { Orders } from '../screens/orders'

export const Routes = () => (
    <>
    <Route path="/" exact={true} component={Orders} />
    <Route path="/orders" exact={true} component={Orders} />
    <Route path="/billing" component={Billing} />
    </>
)