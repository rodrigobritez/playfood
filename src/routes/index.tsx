import { Route } from 'react-router-dom'
import { Orders } from '../screens/orders'

export const Routes = () => (
    <Route path="/" exact={true} component={Orders} />
)