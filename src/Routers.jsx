import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavBar } from './components/header/NavBar';
import { ProductList } from './components/product/ProductList';
import { Products } from './components/product/Products';
import { ShoppingCartProvider } from './contexts/ShoppingCartContext';
import { Loading } from './components/loading/Loading';


export const Routers = () => {

    return (
        <ShoppingCartProvider>
            <Router >
                <NavBar/>
                <Routes>
                    <Route path='/' element={<ProductList/>} />
                    <Route path='/Loading' element={<Loading/>} />
                    <Route path='/products' element={<Products/>} />
                </Routes>
            </Router>
        </ShoppingCartProvider>

    )
}
