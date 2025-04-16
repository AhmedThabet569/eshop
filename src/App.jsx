import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate, 
} from "react-router-dom";import Home from './pages/home/Home'
 import Cart from './pages/cart/Cart'
import Order from './pages/order/Order'
import NoPage from './pages/nopage/NoPage'
 import MyState from './context/data/myState'
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProductInfo from './pages/productInfo/ProductInfo';
import Dashboard from './pages/admin/dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';
import AddProduct from './pages/admin/pages/AddProduct';
import UpdateProduct from './pages/admin/pages/UpdateProduct';
import js from '@eslint/js';

const App = () => {
  return (
    <MyState>
      <Router>
           <Routes>
               <Route path="/" element={<Home/>} />
                 <Route path="/cart" element={<Cart/>} />
                 <Route path='/login' element={<Login/>} />
                 <Route path='/register' element={<Register/>} />
                 <Route path="/productinfo/:id" element={<ProductInfo />} /> 
             
                    <Route path="/order" element={
                        <ProtectedRoutes>
                            <Order/>
                        </ProtectedRoutes>
                    } />
              
                <Route path="/dashboard" element={
                  <AdminProtectedRoutes>
                  <Dashboard/>
              </AdminProtectedRoutes>
                } />
                <Route path='/addproduct' element={         <AdminProtectedRoutes>
                  <AddProduct/>
              </AdminProtectedRoutes>} />
                <Route path='/updateproduct' element={         <AdminProtectedRoutes>
                  <UpdateProduct/>
              </AdminProtectedRoutes>} /> 
                <Route path="/*" element={<NoPage/>} />
           </Routes>
             <ToastContainer/>
      </Router>
      </MyState>
  )
}

export default App



// add prottected routes
 export const ProtectedRoutes = ({children}) => {
  if(localStorage.getItem('user')){
    return children;
  }else{
    return <Navigate to='/login'/>
  }
 }

 export const AdminProtectedRoutes = ({children}) => {
    const admin = JSON.parse(localStorage.getItem('user'));
    if(admin?.user.email === 'thabet@gmail.com')
    {
      return children;
    }else{
      return <Navigate to='/login'/>
    }
 }