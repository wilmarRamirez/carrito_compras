import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  /*  Inicialización del estado */
  const [allProducts, setAllProducts] = useState(() => {
    /* Intenta recuperar los datos de localStorage, o retorna un array vacío si no hay datos */
    const storedProducts = localStorage.getItem('allProducts');
    return storedProducts ? JSON.parse(storedProducts) : [];
  });
  const [total, setTotal] = useState(() => {
    /* Intenta recuperar el total de localStorage, o retorna 0 si no hay datos */
    const storedTotal = localStorage.getItem('total');
    return storedTotal ? parseInt(storedTotal) : 0;
  });
  const [countProducts, setCountProducts] = useState(() => {
    /* Intenta recuperar el conteo de productos de localStorage, o retorna 0 si no hay datos */
    const storedCountProducts = localStorage.getItem('countProducts');
    return storedCountProducts ? parseInt(storedCountProducts) : 0;
  });

/* Efecto para actualizar localStorage cuando cambian los estados */
  useEffect(() => {
    localStorage.setItem('allProducts', JSON.stringify(allProducts));
  }, [allProducts]);

  useEffect(() => {
    localStorage.setItem('total', total.toString());
  }, [total]);

  useEffect(() => {
    localStorage.setItem('countProducts', countProducts.toString());
  }, [countProducts]);

  return (
    <CartContext.Provider value={{ allProducts, setAllProducts, total, setTotal, countProducts, setCountProducts }}>
      {children}
    </CartContext.Provider>
  );
};
