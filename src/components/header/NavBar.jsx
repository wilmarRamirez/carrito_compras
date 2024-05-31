import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { CartContext } from '../../contexts/ShoppingCartContext';

/* import { Products } from '../product/Products'; */



export const NavBar = () => {

  /* setTimeout(() => {
    console.log('Esta función se ejecutó después de 3 segundos');
  }, 3000); */
/* 
  const intervalId = setInterval(() => {
    
  }, 20000000); */
  console.log(JSON.parse(localStorage.getItem("allProducts")));


  const { allProducts, setAllProducts, total, setTotal, countProducts, setCountProducts } = useContext(CartContext);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link className="nav-link" to={"/"}>
        <Navbar.Brand>
                React-Bootstrap
              </Navbar.Brand>
              </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <Nav>
              <Link className="nav-link" to={"/"}>
                Home
              </Link>
              </Nav>
            <Nav>
              <Link className="nav-link" to={"/products"}>
                cart items: <span className="cart-count">{countProducts}</span>
              </Link>
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
