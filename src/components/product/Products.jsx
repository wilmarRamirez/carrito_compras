import React, { useState } from 'react';

import './products.css';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegTrashCan } from "react-icons/fa6";

export const Products = ({
  allProducts,
  setAllProducts,
  total,
  setTotal,
  countProducts,
  setCountProducts,
}) => {

  const [active, setActive] = useState(false);

/* para atualizar la cantidad de elementos del carrito y los valores como el total de objetos, 
cantidad del producto y valor total */

  const onUpdateProduct = (product, action) => {
    if (allProducts.find(item => item.id === product.id)) {
      if (action === 'add') {

        /* buscamos el objeto que necesitamos modificar y la cantidad la sumamos de uno en uno y 
        luego atualizamos los datos como valor total y cantidad de productos */

        const products = allProducts.map(item =>
          (item.ID === product.ID) && (action === 'add')
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setTotal(parseInt(total) + parseInt(product.Precio_detal));
        setCountProducts(countProducts + 1);
        return setAllProducts([...products]);

      } else if (action === 'remove') {

        /* buscamos el prodcuto que necesitamos modificar y luego le restamos de uno en uno y 
        si el prodecto llega a cantidad a cero lo sacamos de la lista del carrito
        y luego atualizamos nuevamente la cantidad total de productos y el valor total */

        const products = allProducts.map(item =>
          (item.ID === product.ID) && (action === 'remove')
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        setTotal(parseInt(total) - parseInt(product.price));
        setCountProducts(countProducts - 1);
        if (product.quantity === 1) {
          const results = allProducts.filter(
            item => item.ID !== product.ID
          );
          product = null
          return setAllProducts(results);
        }
        product = null
        return setAllProducts([...products]);
      }

    }
  };

/* llamamos el con el evento para eliminar el producto de la lista */
  const onDeleteProduct = product => {
    const results = allProducts.filter(
      item => item.ID !== product.ID
    );
    setTotal(total - product.Precio_detal * product.quantity);
    setCountProducts(countProducts - product.quantity);
    setAllProducts(results);
  };

/* eliminamos toda la lista del carrito */
  const onCleanCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  };
  return (
    <Card style={{ width: '30rem' }}>
      <Card.Header onClick={() => setActive(!active)}>
        <AiOutlineShoppingCart style={{ fontSize: '2rem' }} />  {countProducts}
      </Card.Header>
      <ListGroup variant="flush"
        className={`${active ? '' : 'hidden-cart'
          }`}
      >
        {allProducts.length ? (
          <ListGroup.Item >
            {allProducts.map(product => (
              <Container key={product.ID} style={{ margin: '1rem' }}>
                <Row >
                  <Col>
                    <img src={product.Imagen_publica.url} alt={product.name} style={{ width: '5rem' }} />
                  </Col>
                  <Col>
                    {product.name}
                  </Col>
                  <Col>
                    <InputGroup style={{ width: '7rem' }}>
                      <Button variant="outline-secondary" id="button-addon1" onClick={() => onUpdateProduct(product, 'remove')}>-</Button>
                      <Form.Control placeholder={product.quantity} />
                      <Button variant="outline-secondary" id="button-addon1" onClick={() => onUpdateProduct(product, 'add')}>+</Button>
                    </InputGroup>
                  </Col>
                  <Col>
                    {/* ${product.Precio_detal} */}
                    ${product.Precio_detal * product.quantity}
                  </Col>
                  <Col>
                    <AiOutlineClose onClick={() => onDeleteProduct(product)} />
                  </Col>
                </Row>
              </Container>
            ))}
            <hr></hr>
            <Container>
              <Row style={{ display: 'flex' }}>
                <Col>Total: ${total}</Col>
                <Col><FaRegTrashCan style={{ fontSize: '2rem', float: 'right' }} onClick={onCleanCart} /></Col>
              </Row>
            </Container>

          </ListGroup.Item>
        ) : (
          <p className='cart-empty'>El carrito está vacío</p>
        )}
      </ListGroup>
    </Card >
  )
}
