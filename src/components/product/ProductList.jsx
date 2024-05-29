import React from 'react'
import  data  from '../../data';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const ProductList = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const onAddProduct = product => {
    if (allProducts.find(item => item.id === product.id)) {
      const products = allProducts.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setTotal(total + product.price * product.quantity);
      setCountProducts(countProducts + product.quantity);
      return setAllProducts([...products]);
    }
    setTotal(total + product.price * product.quantity);
    setCountProducts(countProducts + product.quantity);
    setAllProducts([...allProducts, product]);
  };

  return (
    <div style={{display:'flex'}}>
      {data.map(product => (
        <Card style={{ width: '18rem', margin: '1rem' }}  key={product.idx}>
          <Card.Img variant="top" src={product.imgUrl} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
              {product.description}
            </Card.Text>
            <Button variant="primary" onClick={() => onAddProduct(product)}>
							Añadir al carrito
						</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}