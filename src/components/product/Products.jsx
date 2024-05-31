import React, { useContext, useState } from 'react';
import './products.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegTrashCan } from "react-icons/fa6";
import { CartContext } from '../../contexts/ShoppingCartContext';

export const Products = () => {
  /* const [active, setActive] = useState(false); */
  const { allProducts, setAllProducts, total, setTotal, countProducts, setCountProducts } = useContext(CartContext);

  const onUpdateProduct = (product, action) => {
    const updatedProducts = allProducts.map(item => {
      if (item.ID === product.ID) {
        const updatedQuantity = action === 'add' ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: updatedQuantity };
      }
      return item;
    });

    const updatedProduct = updatedProducts.find(item => item.ID === product.ID);

    if (updatedProduct.quantity === 0) {
      onDeleteProduct(updatedProduct);
    } else {
      setTotal(total + (action === 'add' ? parseFloat(product.Precio_detal) : -parseFloat(product.Precio_detal)));
      setCountProducts(countProducts + (action === 'add' ? 1 : -1));
      setAllProducts(updatedProducts);
    }
  };

  const onDeleteProduct = product => {
    const updatedProducts = allProducts.filter(item => item.ID !== product.ID);
    setTotal(total - parseFloat(product.Precio_detal) * product.quantity);
    setCountProducts(countProducts - product.quantity);
    setAllProducts(updatedProducts);
  };

  const onCleanCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  };

  return (
    <Card style={{ width: '30rem' }}>
      <Card.Header /* onClick={() => setActive(!active)} */>
        <AiOutlineShoppingCart style={{ fontSize: '2rem' }} /> {countProducts}
      </Card.Header>
      <ListGroup variant="flush" /* className={`${active ? '' : 'hidden-cart'}`} */>
        {allProducts.length ? (
          <ListGroup.Item>
            {allProducts.map(product => (
              <Container key={product.ID} style={{ margin: '1rem' }}>
                <Row>
                  <Col>
                    <img src={product.Imagen_publica?.url} alt={product.name} style={{ width: '5rem' }} />
                  </Col>
                  <Col>
                    {product.name}
                  </Col>
                  <Col>
                    <InputGroup style={{ width: '7rem' }}>
                      <Button variant="outline-secondary" onClick={() => onUpdateProduct(product, 'remove')}>-</Button>
                      <Form.Control value={product.quantity} readOnly />
                      <Button variant="outline-secondary" onClick={() => onUpdateProduct(product, 'add')}>+</Button>
                    </InputGroup>
                  </Col>
                  <Col>
                    ${product.Precio_detal * product.quantity}
                  </Col>
                  <Col>
                    <AiOutlineClose onClick={() => onDeleteProduct(product)} />
                  </Col>
                </Row>
              </Container>
            ))}
            <hr />
            <Container>
              <Row>
                <Col>Total: ${total}</Col>
                <Col>
                  <FaRegTrashCan style={{ fontSize: '2rem', float: 'right' }} onClick={onCleanCart} />
                </Col>
              </Row>
            </Container>
          </ListGroup.Item>
        ) : (
          <p className='cart-empty'>El carrito está vacío</p>
        )}
      </ListGroup>
    </Card>
  );
};
