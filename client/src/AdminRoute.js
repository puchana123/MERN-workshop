import {getUser} from './services/authorize'
import {Navigate,Outlet} from 'react-router-dom'

const AdminRoute = ()=>{
    return(
        getUser()?
            <Outlet/> // use to render childern Route
            : <Navigate to={'/login'} replace/>
    )    
    
}

export default AdminRoute