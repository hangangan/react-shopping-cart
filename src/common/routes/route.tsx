import { Navigate } from "react-router-dom"
import Commodity from "../../pages/ Commodity"
import ShoppingCart from "../../pages/ ShoppingCart"
import Pay from "../../pages/Pay"
import LocationEdit from "../../pages/LocationEdit"

const routes = [
    {
        path:"/commodity",
        element:<Commodity/>
    },
    {
        path:"/shoppingcart",
        element:<ShoppingCart/>
    },
    {
        path:"/pay",
        element:<Pay/>
    },
    {
        path:"/locationedit",
        element:<LocationEdit/>
    },
    {
        path:"/",
        element:<Navigate to='/commodity' />
    },
]

export default routes