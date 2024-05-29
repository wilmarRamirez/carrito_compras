import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from './components/header/NavBar';
import { ProductList } from './components/product/ProductList';
import { Products } from './components/product/Products';


export const Router = () => {

    const [allProducts, setAllProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [countProducts, setCountProducts] = useState(0);

    return (
        <BrowserRouter >
            <NavBar
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
            />
            <Routes>
                <Route path='/' element={<ProductList
                    allProducts={allProducts}
                    setAllProducts={setAllProducts} 
                    total={total}
                    setTotal={setTotal}
                    countProducts={countProducts}
                    setCountProducts={setCountProducts}
                    />} />
                <Route path='/products' element={<Products
                    allProducts={allProducts}
                    setAllProducts={setAllProducts} 
                    total={total}
                    setTotal={setTotal}
                    countProducts={countProducts}
                    setCountProducts={setCountProducts}
                    />} />
            </Routes>
        </BrowserRouter>

    )
}
