import {BrowserRouter,Route,Routes} from 'react-router-dom'
import App from './App'
import EditComponent from './components/EditeComponent'
import FormComponent from './components/FormComponent'
import LoginComponent from './components/LoginComponent'
import SingleComponent from './components/SingleComponent'
import AdminRoute from './AdminRoute'

const MyRoute = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<AdminRoute/>}>
                    <Route path='/create' element={<FormComponent/>} />
                    <Route path='/blog/edit/:slug' element={<EditComponent />} />
                </Route>
                <Route path='/' element={<App/>} />
                <Route path='/blog/:slug' element={<SingleComponent />} />
                <Route path='/login' element={<LoginComponent/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoute