import React, { useState } from 'react';

import './products.css';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

  const onDeleteProduct = product => {
    const results = allProducts.filter(
      item => item.id !== product.id
    );
    setTotal(total - product.price * product.quantity);
    setCountProducts(countProducts - product.quantity);
    setAllProducts(results);
  };

  const onCleanCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  };
  return (
    <Card style={{ width: '25rem' }}>
      <Card.Header onClick={() => setActive(!active)}>
        <AiOutlineShoppingCart style={{fontSize:'2rem'}} />  {countProducts}
      </Card.Header>
      <ListGroup variant="flush"
        className={`${active ? '' : 'hidden-cart'
          }`}
      >
        {allProducts.length ? (
          <ListGroup.Item >
            {allProducts.map(product => (
              <Container style={{margin: '1rem'}}>
                <Row key={product.id}>
                  <Col>
                    <img src={product.imgUrl} alt={product.name} style={{width: '5rem'}} />
                  </Col>
                  <Col>
                    {product.name}
                  </Col>
                  <Col>
                    {product.quantity}
                  </Col>
                  <Col>
                    ${product.price}
                  </Col>
                  <Col>
                    <AiOutlineClose onClick={() => onDeleteProduct(product)} />
                  </Col>
                </Row>
              </Container>

            ))}
            <hr></hr>
            <Container>
              <Row style={{display:'flex'}}>
                <Col>Total: ${total}</Col>
                <Col><FaRegTrashCan style={{fontSize:'2rem', float:'right'}} onClick={onCleanCart}/></Col>
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
